# Guía de Despliegue Local — HTTPS + Nginx

**Turismo Cali — Consorcio "Ruta 7 Ríos"**
**HU-70: Landing Page HTTPS · HU-79: Certificados SSL Autofirmados**

---

## Objetivo

Esta guía permite al desarrollador probar **en su máquina local** (Linux/Ubuntu/WSL) que el stack completo funciona antes de desplegarlo en las Máquinas Virtuales del laboratorio (Track 2 WAN):

- Build de producción del frontend React/Vite.
- Certificados SSL autofirmados.
- Nginx como reverse proxy con HTTPS.
- Backend Express corriendo en modo producción.

> **Nota**: Todos los comandos asumen un entorno Linux (Ubuntu 22.04 o WSL2 en Windows). Si usas WSL, asegúrate de que Nginx esté instalado dentro de WSL, no en Windows.

---

## Prerrequisitos

```bash
# Verificar que tienes las herramientas necesarias
node --version    # ≥ 18
npm --version     # ≥ 9
nginx -v          # nginx/1.x
openssl version   # OpenSSL 3.x
mysql --version   # mysql 8.x (o verificar que el servicio MySQL esté corriendo)
```

Si falta Nginx u OpenSSL:

```bash
sudo apt update
sudo apt install -y nginx openssl
```

---

## Paso 1: Build de Producción del Frontend

Desde la **raíz del monorepo**:

```bash
# Instalar dependencias (si no lo has hecho)
npm install

# Compilar el frontend (React + Vite → frontend/dist/)
npm run build --workspace=frontend
```

Verificar que se generó el build:

```bash
ls -la frontend/dist/
# Deberías ver: index.html, assets/
```

---

## Paso 2: Generar Certificado SSL Autofirmado

Generar un certificado SSL válido por 365 días para el dominio `turismocali.local`:

```bash
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/ssl/private/turismocali.key \
  -out /etc/ssl/certs/turismocali.crt \
  -subj "/C=CO/ST=Valle del Cauca/L=Cali/O=Ruta 7 Rios/OU=Track 2 WAN/CN=turismocali.local"
```

Verificar que los archivos se crearon:

```bash
ls -la /etc/ssl/certs/turismocali.crt
ls -la /etc/ssl/private/turismocali.key
```

Verificar el contenido del certificado:

```bash
openssl x509 -in /etc/ssl/certs/turismocali.crt -text -noout | head -20
```

---

## Paso 3: Configurar Nginx

### 3.1. Crear el directorio para los archivos estáticos

```bash
# Crear el directorio donde Nginx servirá el frontend
sudo mkdir -p /var/www/turismocali/frontend/dist

# Copiar el build de React al directorio de Nginx
sudo cp -r frontend/dist/* /var/www/turismocali/frontend/dist/

# Asegurar permisos de lectura para Nginx
sudo chown -R www-data:www-data /var/www/turismocali
sudo chmod -R 755 /var/www/turismocali
```

### 3.2. Instalar la configuración de Nginx

```bash
# Copiar nuestra configuración al directorio de Nginx
sudo cp infraestructura/nginx.conf /etc/nginx/sites-available/turismocali

# Crear enlace simbólico a sites-enabled
sudo ln -sf /etc/nginx/sites-available/turismocali /etc/nginx/sites-enabled/turismocali

# Eliminar el sitio default si existe (para evitar conflictos en puerto 80)
sudo rm -f /etc/nginx/sites-enabled/default
```

### 3.3. Validar y reiniciar Nginx

```bash
# Verificar que la configuración sea válida
sudo nginx -t

# Si la prueba pasa, reiniciar Nginx
sudo systemctl restart nginx

# Verificar que Nginx esté corriendo
sudo systemctl status nginx
```

### 3.4. Agregar el dominio local al archivo hosts

```bash
# Agregar entrada en /etc/hosts para resolver turismocali.local
echo "127.0.0.1 turismocali.local www.turismocali.local" | sudo tee -a /etc/hosts
```

---

## Paso 4: Configurar y Levantar el Backend

### 4.1. Configurar variables de entorno

```bash
cd backend

# Copiar el archivo de ejemplo (si no lo has hecho)
cp .env.example .env

# Editar con tus credenciales locales
# nano .env   ó   code .env
```

Contenido mínimo del `.env` para producción local:

```env
PORT=4000
NODE_ENV=production
CORS_ORIGIN=https://turismocali.local
FRONTEND_URL=https://turismocali.local

# Base de datos MySQL local
DATABASE_URL=mysql://turismo_user:tu_password@localhost:3306/turismo_cali_db

# LDAP (usar valores del servidor de Cali o mock para desarrollo)
LDAP_URL=ldap://10.0.3.10:389
LDAP_BIND_DN=cn=admin,dc=ruta7rios,dc=local
LDAP_BIND_PASSWORD=tu_password_ldap
LDAP_SEARCH_BASE=ou=users,dc=ruta7rios,dc=local

# JWT
JWT_SECRET=tu_secreto_jwt_seguro_de_al_menos_32_caracteres
JWT_EXPIRES_IN=8h
```

### 4.2. Generar Prisma y ejecutar migraciones

```bash
# Generar el cliente Prisma tipado
npx prisma generate

# Ejecutar migraciones (crear tablas en la BD)
npx prisma migrate dev --name init

# (Opcional) Verificar la BD con Prisma Studio
npx prisma studio
```

### 4.3. Compilar y ejecutar el backend

```bash
# Compilar TypeScript a JavaScript
npm run build

# Ejecutar en modo producción
npm run start
# El servidor Express estará escuchando en http://localhost:4000
```

Para mantener el backend corriendo en segundo plano (producción):

```bash
# Opción A: usando PM2 (recomendado para producción)
npm install -g pm2
pm2 start dist/server.js --name turismo-backend
pm2 save
pm2 startup  # Configura inicio automático con el sistema

# Opción B: usando nohup (alternativa simple)
nohup node dist/server.js > backend.log 2>&1 &
```

---

## Paso 5: Verificar el Despliegue Completo

### 5.1. Health Check del Backend

```bash
curl -s http://localhost:4000/api/health
# Esperado: {"status":"ok"} o similar
```

### 5.2. Verificar HTTPS (Nginx → Frontend)

```bash
# Verificar redirección HTTP → HTTPS (301)
curl -I http://turismocali.local
# Esperado: HTTP/1.1 301 Moved Permanently
#           Location: https://turismocali.local/

# Verificar HTTPS (aceptar certificado autofirmado con -k)
curl -k https://turismocali.local
# Esperado: El HTML del index.html de React
```

### 5.3. Verificar Reverse Proxy (Nginx → Backend API)

```bash
curl -k https://turismocali.local/api/health
# Esperado: {"status":"ok"} — respuesta del backend a través de Nginx
```

### 5.4. Abrir en el Navegador

1. Abrir **Chrome/Firefox** y navegar a: `https://turismocali.local`
2. El navegador mostrará una advertencia de certificado autofirmado → hacer clic en **"Avanzado" → "Continuar"**.
3. Debería verse la Landing Page de Turismo Cali.
4. Navegar a `https://turismocali.local/login` para probar el login.

---

## Troubleshooting

### Nginx no arranca

```bash
# Ver el error exacto
sudo nginx -t

# Errores comunes:
# - "conflicting server name" → Hay otro server block en port 80/443
# - "cannot load certificate" → Verificar rutas de los archivos .crt y .key
```

### Error "502 Bad Gateway" en /api/

```bash
# El backend no está corriendo en el puerto 4000
curl http://localhost:4000/api/health

# Si falla, verificar:
cd backend && npm run start
# o revisar logs de PM2:
pm2 logs turismo-backend
```

### Certificado no es aceptado por el navegador

Esto es **normal** con certificados autofirmados. Opciones:

1. Aceptar la excepción manualmente en el navegador.
2. Importar `turismocali.crt` al almacén de certificados del sistema:
   ```bash
   sudo cp /etc/ssl/certs/turismocali.crt /usr/local/share/ca-certificates/turismocali.crt
   sudo update-ca-certificates
   ```

### Puerto 80 o 443 ya en uso

```bash
# Ver qué proceso está usando el puerto
sudo lsof -i :80
sudo lsof -i :443

# Si es Apache, detenerlo:
sudo systemctl stop apache2
sudo systemctl disable apache2
```

### WSL: Nginx no accesible desde Windows

En WSL2, el servicio Nginx corre dentro de la VM de Linux. Para acceder desde el navegador de Windows:

```bash
# Obtener la IP de WSL
hostname -I

# Desde Windows, usar esa IP en lugar de localhost:
# https://<ip-de-wsl>
# O agregar al hosts de Windows (C:\Windows\System32\drivers\etc\hosts):
# <ip-de-wsl> turismocali.local
```

---

## Resumen de Comandos (Quick Reference)

```bash
# === Desde la raíz del monorepo ===

# 1. Build frontend
npm run build --workspace=frontend

# 2. Certificado SSL
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/ssl/private/turismocali.key \
  -out /etc/ssl/certs/turismocali.crt \
  -subj "/C=CO/ST=Valle del Cauca/L=Cali/O=Ruta 7 Rios/CN=turismocali.local"

# 3. Copiar build y config de Nginx
sudo mkdir -p /var/www/turismocali/frontend/dist
sudo cp -r frontend/dist/* /var/www/turismocali/frontend/dist/
sudo cp infraestructura/nginx.conf /etc/nginx/sites-available/turismocali
sudo ln -sf /etc/nginx/sites-available/turismocali /etc/nginx/sites-enabled/turismocali
sudo rm -f /etc/nginx/sites-enabled/default
echo "127.0.0.1 turismocali.local" | sudo tee -a /etc/hosts

# 4. Reiniciar Nginx
sudo nginx -t && sudo systemctl restart nginx

# 5. Backend en producción
cd backend
npx prisma generate
npx prisma migrate dev --name init
npm run build
npm run start  # o: pm2 start dist/server.js --name turismo-backend

# 6. Verificar
curl -k https://turismocali.local
curl -k https://turismocali.local/api/health
```

---

<div align="center">

<sub>Volver al <a href="../../README.md">README principal</a> · <a href="../architecture/system-design.md">Diseño del Sistema</a></sub>

</div>
