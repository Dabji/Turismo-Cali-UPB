# Guía de Contribución

¡Gracias por tu interés en contribuir a **Turismo Cali — Ruta 7 Ríos**! Este documento describe las convenciones y el proceso para contribuir al proyecto.

## Prerrequisitos

- **Node.js** ≥ 18
- **npm** ≥ 9
- **MySQL** ≥ 8.0
- Familiaridad con **TypeScript**, **React** y **Express**

## Configuración del Entorno

```bash
# 1. Fork y clona el repositorio
git clone https://github.com/TU-USUARIO/Turismo-Cali-UPB.git
cd Turismo-Cali-UPB

# 2. Instala dependencias (monorepo)
npm install

# 3. Configura variables de entorno
cp backend/.env.example backend/.env
# Edita backend/.env con tus credenciales locales

# 4. Genera el cliente Prisma
cd backend && npx prisma generate && cd ..

# 5. Inicia en modo desarrollo
npm run dev
```

## Flujo de Trabajo

1. Crea una rama desde `develop`:
   ```bash
   git checkout -b feature/hu-XX-descripcion-corta
   ```
2. Realiza tus cambios siguiendo las convenciones del proyecto.
3. Ejecuta los tests:
   ```bash
   npm run test --workspace=backend
   npm run test --workspace=frontend
   ```
4. Haz commit siguiendo [Conventional Commits](#convención-de-commits).
5. Abre un Pull Request usando la [plantilla de PR](./.github/PULL_REQUEST_TEMPLATE.md).

## Convención de Commits

Utilizamos [Conventional Commits](https://www.conventionalcommits.org/es/):

```
<tipo>(alcance opcional): descripción corta

[cuerpo opcional]

[pie(s) opcional(es)]
```

### Tipos permitidos

| Tipo | Descripción |
|---|---|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de bug |
| `docs` | Cambios en documentación |
| `style` | Formato (sin cambio de lógica) |
| `refactor` | Refactorización de código |
| `test` | Agregar o corregir tests |
| `chore` | Tareas de mantenimiento |
| `perf` | Mejora de rendimiento |
| `ci` | Cambios en CI/CD |
| `infra` | Cambios en infraestructura (Nginx, scripts, red) |

### Ejemplos

```
feat(landing): agregar sección de servicios turísticos destacados
fix(auth): corregir fallback LDAP cuando el servidor no responde
docs(readme): actualizar guía de inicio rápido
infra(nginx): configurar redirección HTTPS con certificados autofirmados
test(api): agregar tests para endpoint de contacto
```

## Convenciones de Código

### General

- **Idioma del código**: Inglés para nombres de variables, funciones y clases.
- **Idioma de comentarios**: Español (el proyecto es institucional UPB).
- **Nombres de archivos**: `kebab-case` para archivos y carpetas.
- **TypeScript**: Tipado estricto, sin `any` salvo justificación.

### Frontend (`frontend/`)

- Componentes funcionales con hooks.
- Estilos con **Tailwind CSS** (utility-first).
- Navegación con **React Router**.
- Cliente HTTP con **Axios**.

### Backend (`backend/`)

- API REST con **Express** + middlewares de seguridad.
- ORM con **Prisma** (schema declarativo, migraciones versionadas).
- Autenticación dual: **LDAP** (ldapjs) + **JWT** + **bcrypt** (fallback).
- DTOs tipados con TypeScript.
- Logging estructurado con **Winston** + **Morgan**.

## Estructura de Ramas

| Rama | Propósito |
|---|---|
| `main` | Rama principal (producción) |
| `develop` | Integración de features |
| `feature/hu-XX-*` | Nuevas funcionalidades |
| `fix/hu-XX-*` | Corrección de bugs |
| `docs/*` | Cambios de documentación |
| `infra/*` | Cambios de infraestructura |

## Reporte de Bugs

Utiliza la [plantilla de issues](./.github/ISSUE_TEMPLATE/) para reportar bugs. Incluye:

- Descripción clara del problema.
- Pasos para reproducir.
- Comportamiento esperado vs. actual.
- Capturas de pantalla si aplica.

## Vulnerabilidades de Seguridad

**NO** reportes vulnerabilidades de seguridad como issues públicos. Consulta [SECURITY.md](./SECURITY.md) para el proceso correcto.

---

<div align="center">
  <sub>🔙 <a href="./README.md">Volver al README principal</a></sub>
</div>
