# Guía de Configuración — Consumo de Servicios Externos

**Consorcio Turístico "Ruta 7 Ríos"**
**Sede Cali — VLAN 3 — Track 2 WAN**

---

## Índice

1. [Contexto](#1-contexto)
2. [Consumo de VoIP — Servidor de Bogotá (HU-65)](#2-consumo-de-voip--servidor-de-bogotá-hu-65)
3. [Consumo de Proxy — Servidor de Bucaramanga (HU-68)](#3-consumo-de-proxy--servidor-de-bucaramanga-hu-68)
4. [Consumo de DNS — Servidor de Medellín](#4-consumo-de-dns--servidor-de-medellín)
5. [Verificación de Conectividad](#5-verificación-de-conectividad)

---

## 1. Contexto

Dentro del Track 2 de conectividad WAN nacional, cada sede del consorcio "Ruta 7 Ríos" provee y consume servicios de red:

| Sede | Servicio Provisto | IP de Referencia (ejemplo) |
|---|---|---|
| **Cali** | Autenticación LDAP/DA | `10.0.3.10` |
| **Bogotá** | VoIP (Telefonía IP) | `10.0.1.10` |
| **Bucaramanga** | Proxy (Salida a Internet) | `10.0.2.10` |
| **Medellín** | DNS | `10.0.4.10` |

> **Nota**: Las IPs son de referencia para la topología del laboratorio. Consultar el documento de topología WAN (`docs/track 2/topología_proyecto.pkt`) para las direcciones reales asignadas.

Nuestra sede (Cali, VLAN 3) es **consumidora/cliente** de los servicios VoIP, Proxy y DNS provistos por las demás sedes. No administramos esos servidores; solo nos conectamos a ellos.

---

## 2. Consumo de VoIP — Servidor de Bogotá (HU-65)

### 2.1. Requisitos Previos

- Estar conectado a la red de la sede Cali (VLAN 3).
- Tener un softphone instalado: **Zoiper** (Windows/Linux/Mac) o **MicroSIP** (Windows).
- Contar con las credenciales SIP asignadas por el administrador de VoIP de Bogotá (extensión + contraseña).

### 2.2. Configuración en Zoiper

1. **Descargar e instalar** Zoiper desde [https://www.zoiper.com/](https://www.zoiper.com/).
2. Abrir Zoiper y seleccionar **"Settings" → "Accounts" → "Add new SIP account"**.
3. Completar los campos:

   | Campo | Valor |
   |---|---|
   | **Account name** | `Cali - Ruta7Rios` |
   | **Domain / Server** | `10.0.1.10` (IP del servidor VoIP de Bogotá) |
   | **Username** | Tu extensión SIP asignada (ej: `3001`) |
   | **Password** | Contraseña proporcionada por el admin de Bogotá |
   | **Auth username** | Igual que Username (ej: `3001`) |
   | **Transport** | `UDP` |
   | **Port** | `5060` |

4. Hacer clic en **"Register"**.
5. Verificar que el estado cambie a **"Registered"** (indicador verde).
6. Probar realizando una llamada a otra extensión de la red WAN.

### 2.3. Configuración en MicroSIP (Windows)

1. **Descargar e instalar** MicroSIP desde [https://www.microsip.org/](https://www.microsip.org/).
2. Al abrir por primera vez, aparece el diálogo de "Add Account".
3. Completar:

   | Campo | Valor |
   |---|---|
   | **Account Name** | `Cali-VoIP` |
   | **SIP Server** | `10.0.1.10` |
   | **SIP Proxy** | *(dejar vacío)* |
   | **Username** | Tu extensión SIP (ej: `3001`) |
   | **Domain** | `10.0.1.10` |
   | **Password** | Contraseña SIP asignada |
   | **Transport** | `UDP` |

4. Hacer clic en **"Save"**.
5. El icono del teléfono debe ponerse en verde indicando registro exitoso.

### 2.4. Solución de Problemas VoIP

| Problema | Causa Probable | Solución |
|---|---|---|
| "Registration failed" | Credenciales incorrectas | Verificar usuario/contraseña con admin de Bogotá |
| "408 Request Timeout" | Sin conectividad WAN | Verificar que hay ruta hacia `10.0.1.10` (`ping 10.0.1.10`) |
| Audio en un solo sentido | NAT / Firewall | Verificar que UDP 5060 y rango RTP (10000-20000) estén abiertos |
| Sin audio | Codec no soportado | Configurar codec `G.711 (alaw/ulaw)` en el softphone |

---

## 3. Consumo de Proxy — Servidor de Bucaramanga (HU-68)

### 3.1. Datos del Proxy

| Parámetro | Valor |
|---|---|
| **Dirección del Proxy** | `10.0.2.10` |
| **Puerto** | `3128` (Squid por defecto) |
| **Tipo** | HTTP / HTTPS |
| **Autenticación** | Según configuración de Bucaramanga (consultar con su admin) |

### 3.2. Configuración en Windows

#### Opción A: Configuración del Sistema (Afecta todo el equipo)

1. Abrir **Configuración** → **Red e Internet** → **Proxy**.
2. En la sección **"Configuración manual del proxy"**, activar el interruptor.
3. Completar:
   - **Dirección**: `10.0.2.10`
   - **Puerto**: `3128`
4. En **"No usar el servidor proxy para las direcciones que empiecen por"**, agregar:
   ```
   localhost;127.0.0.1;10.0.3.*;*.ruta7rios.local
   ```
5. Hacer clic en **Guardar**.

#### Opción B: Configuración solo en el Navegador (Chrome/Edge)

Chrome y Edge en Windows usan la configuración del sistema por defecto. Para una configuración independiente, usar una extensión como **SwitchyOmega**:

1. Instalar la extensión **Proxy SwitchyOmega** desde la Chrome Web Store.
2. Crear un nuevo perfil de tipo **"Proxy Profile"**.
3. Configurar:
   - **Protocol**: `HTTP`
   - **Server**: `10.0.2.10`
   - **Port**: `3128`
4. En la pestaña **"Bypass List"**, agregar:
   ```
   localhost
   127.0.0.1
   10.0.3.*
   *.ruta7rios.local
   ```
5. Guardar y activar el perfil desde el icono de la extensión.

#### Opción C: Configuración en Firefox (independiente del sistema)

1. Abrir Firefox → **Configuración** → **General** → sección **"Configuración de red"** → **Configuración...**
2. Seleccionar **"Configuración manual del proxy"**.
3. Completar:
   - **Proxy HTTP**: `10.0.2.10` — **Puerto**: `3128`
   - Marcar **"Usar este servidor proxy para todos los protocolos"**.
4. En **"No usar proxy para"**, agregar:
   ```
   localhost, 127.0.0.1, 10.0.3.0/24, *.ruta7rios.local
   ```
5. Hacer clic en **Aceptar**.

### 3.3. Configuración en Linux

#### Método 1: Variables de Entorno (sesión actual)

```bash
export http_proxy="http://10.0.2.10:3128"
export https_proxy="http://10.0.2.10:3128"
export no_proxy="localhost,127.0.0.1,10.0.3.0/24,*.ruta7rios.local"
```

Para hacerlo permanente, agregar las líneas anteriores al archivo `~/.bashrc` o `~/.profile`.

#### Método 2: Configuración de GNOME (Ubuntu con interfaz gráfica)

1. Ir a **Configuración** → **Red** → **Proxy de red**.
2. Seleccionar **"Manual"**.
3. Completar:
   - **Proxy HTTP**: `10.0.2.10` — Puerto: `3128`
   - **Proxy HTTPS**: `10.0.2.10` — Puerto: `3128`
4. En **"Ignorar hosts"**, agregar: `localhost,127.0.0.1,10.0.3.*`

#### Método 3: Configuración para `apt` (Debian/Ubuntu)

Crear o editar el archivo `/etc/apt/apt.conf.d/proxy.conf`:

```
Acquire::http::Proxy "http://10.0.2.10:3128";
Acquire::https::Proxy "http://10.0.2.10:3128";
```

### 3.4. Verificación del Proxy

```bash
# Verificar que el proxy responde
curl -x http://10.0.2.10:3128 http://www.google.com -I

# Resultado esperado: HTTP/1.1 200 OK (a través del proxy)
```

---

## 4. Consumo de DNS — Servidor de Medellín

### 4.1. Datos del Servidor DNS

| Parámetro | Valor |
|---|---|
| **IP del servidor DNS** | `10.0.4.10` |
| **Tipo** | DNS recursivo + autoritativo para zona `ruta7rios.local` |

### 4.2. Configuración en Windows

1. Abrir **Panel de Control** → **Centro de redes** → **Cambiar configuración del adaptador**.
2. Clic derecho sobre el adaptador de red → **Propiedades**.
3. Seleccionar **"Protocolo de Internet versión 4 (TCP/IPv4)"** → **Propiedades**.
4. Seleccionar **"Usar las siguientes direcciones de servidor DNS"**:
   - **DNS preferido**: `10.0.4.10`
   - **DNS alternativo**: `8.8.8.8` (fallback público)
5. Aceptar y cerrar.

### 4.3. Configuración en Linux

Editar `/etc/resolv.conf` (temporal) o configurar `systemd-resolved`:

```bash
# /etc/resolv.conf
nameserver 10.0.4.10
nameserver 8.8.8.8
```

### 4.4. Verificación

```bash
# Verificar resolución de nombre interno
nslookup turismocali.local 10.0.4.10

# Verificar resolución de nombre externo a través del DNS de Medellín
nslookup www.google.com 10.0.4.10
```

---

## 5. Verificación de Conectividad

Desde un equipo en la VLAN 3 de Cali, ejecutar las siguientes pruebas para confirmar la conectividad WAN hacia los servicios externos:

```bash
# 1. Verificar ruta hacia VoIP (Bogotá)
ping -c 4 10.0.1.10
traceroute 10.0.1.10

# 2. Verificar ruta hacia Proxy (Bucaramanga)
ping -c 4 10.0.2.10
curl -x http://10.0.2.10:3128 http://www.google.com -I

# 3. Verificar ruta hacia DNS (Medellín)
ping -c 4 10.0.4.10
nslookup turismocali.local 10.0.4.10

# 4. Verificar que nuestro servicio LDAP está accesible (auto-test)
ldapsearch -x -H ldap://10.0.3.10:389 -b "dc=ruta7rios,dc=local" "(objectClass=*)" dn
```

> **Importante**: Si alguna de estas pruebas falla, verificar:
> - Que las VLANs estén correctamente configuradas en los switches.
> - Que el enrutamiento inter-VLAN esté habilitado en el router/switch capa 3.
> - Que los firewalls permitan el tráfico entre las redes del consorcio.
> - Consultar la topología WAN en `docs/track 2/topología_proyecto.pkt`.

---

<div align="center">

<sub>Volver al <a href="../../README.md">README principal</a> · <a href="../architecture/system-design.md">Diseño del Sistema</a></sub>

</div>
