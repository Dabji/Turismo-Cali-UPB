# Turismo Cali — Sistema de Gestión Turística

Monorepo para el sistema de gestión turística de Santiago de Cali, integrado con infraestructura WAN corporativa.

## Estructura del Proyecto

```
Cali/
├── frontend/          # React + TypeScript + TailwindCSS (Vite)
├── backend/           # Node.js + Express + TypeScript + Prisma
├── infraestructura/   # Nginx config + Scripts de backup
├── package.json       # Monorepo workspaces
└── README.md
```

## Stack Tecnológico

| Capa             | Tecnologías                                      |
|------------------|--------------------------------------------------|
| **Frontend**     | React 18, TypeScript, TailwindCSS, Vite, Axios   |
| **Backend**      | Express, TypeScript, Prisma ORM, Winston, Morgan  |
| **Base de Datos**| MySQL 8                                          |
| **Autenticación**| LDAP (ldapjs) + JWT + bcrypt (fallback local)    |
| **Infraestructura** | Nginx (reverse proxy + HTTPS), Bash scripts   |

## Requisitos Previos

- **Node.js** >= 18
- **npm** >= 9
- **MySQL** >= 8.0
- **Nginx** (para producción)

## Instalación

```bash
# Clonar el repositorio
git clone <repo-url>
cd Cali

# Instalar todas las dependencias (monorepo)
npm install

# Configurar variables de entorno del backend
cp backend/.env.example backend/.env
# Editar backend/.env con tus credenciales de MySQL, JWT, LDAP
```

## Base de Datos

```bash
# Generar el cliente Prisma
cd backend
npx prisma generate

# Ejecutar migraciones
npx prisma migrate dev --name init

# (Opcional) Abrir Prisma Studio
npx prisma studio
```

## Desarrollo

```bash
# Iniciar ambos servidores (desde la raíz)
npm run dev

# O individualmente:
npm run dev:backend    # Express en http://localhost:4000
npm run dev:frontend   # Vite en http://localhost:5173
```

## Frontend — Páginas

| Ruta      | Descripción                          | Acceso   |
|-----------|--------------------------------------|----------|
| `/`       | Landing page pública                 | Público  |
| `/login`  | Inicio de sesión (LDAP/local)        | Público  |
| `/admin`  | Dashboard de administración          | Protegido|

## Backend — API Endpoints

| Método | Ruta                     | Descripción                    | Auth     |
|--------|--------------------------|--------------------------------|----------|
| POST   | `/api/auth/login`        | Iniciar sesión                 | No       |
| GET    | `/api/auth/me`           | Datos del usuario autenticado  | JWT      |
| GET    | `/api/tourism/services`  | Listar servicios turísticos    | No       |
| GET    | `/api/tourism/services/:id` | Detalle de servicio         | No       |
| POST   | `/api/tourism/services`  | Crear servicio                 | Admin    |
| PUT    | `/api/tourism/services/:id` | Actualizar servicio         | Admin    |
| DELETE | `/api/tourism/services/:id` | Eliminar servicio (soft)    | Admin    |
| POST   | `/api/contact`           | Enviar mensaje de contacto     | No       |
| GET    | `/api/contact`           | Listar mensajes                | Admin    |
| PATCH  | `/api/contact/:id/read`  | Marcar como leído              | Admin    |
| GET    | `/api/admin/stats`       | Estadísticas del sistema       | Admin    |
| GET    | `/api/admin/audit-logs`  | Logs de auditoría              | Admin    |
| GET    | `/api/admin/users`       | Listar usuarios                | Admin    |
| GET    | `/api/health`            | Health check                   | No       |

## Infraestructura

### Nginx
```bash
# Copiar configuración
sudo cp infraestructura/nginx.conf /etc/nginx/sites-available/turismocali
sudo ln -s /etc/nginx/sites-available/turismocali /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

### Backup de Base de Datos
```bash
# Dar permisos de ejecución
chmod +x infraestructura/backup_db.sh

# Ejecutar backup manual
DB_PASSWORD="tu_password" ./infraestructura/backup_db.sh

# Configurar cron (backup diario a las 2:00 AM)
# crontab -e
# 0 2 * * * DB_PASSWORD="tu_password" /ruta/al/infraestructura/backup_db.sh >> /var/log/backup_db.log 2>&1
```

## Sistema de Logs (No Repudio)

El backend implementa un sistema estricto de auditoría:

- **Winston** — Logs en archivos: `error.log`, `audit.log`, `combined.log`
- **Morgan** — HTTP request logging
- **Middleware de auditoría** — Registra cada acción autenticada con: usuario, IP, user-agent, timestamp, recurso y acción
- Todos los logs se almacenan en BD (`AuditLog`) y en archivos para garantizar no repudio

## Autenticación LDAP

- Intenta autenticar contra servidor LDAP corporativo
- Si LDAP no está disponible, utiliza fallback con autenticación local (bcrypt)
- En modo desarrollo, un mock LDAP permite probar sin servidor real

## Licencia

Proyecto académico — Infraestructura WAN Corporativa
