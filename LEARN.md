# 🎓 GitHub Education - Ruta 7 Ríos

> **ES:** Guía de aprendizaje para recorrer el proyecto como evidencia académica.
> **EN:** Learning guide to explore the project as academic evidence.

![Ruta 7 Ríos hero](./frontend/src/images/heroHeader.jpg)

---

## 🌱 Propósito / Purpose

**ES:** Este repositorio enseña cómo una idea de turismo local puede convertirse en una landing pública, una API base y una documentación técnica verificable.
**EN:** This repository shows how a local tourism idea can become a public landing page, a backend API baseline, and verifiable technical documentation.

---

## 🎯 Resultados de aprendizaje / Learning outcomes

| ES | EN |
|---|---|
| Ejecutar un monorepo con npm workspaces. | Run a monorepo with npm workspaces. |
| Identificar componentes React reutilizables. | Identify reusable React components. |
| Explicar el flujo Frontend → Nginx → Backend → MySQL. | Explain the Frontend → Nginx → Backend → MySQL flow. |
| Entender un despliegue con Tailscale y TLS autofirmado. | Understand a deployment with Tailscale and self-signed TLS. |
| Diferenciar laboratorio académico y producción real. | Differentiate academic lab setup from real production. |
| Documentar evidencia técnica clara. | Document technical evidence clearly. |

---

## 🗺️ Ruta sugerida / Suggested path

| Paso / Step | Lectura / Reading | Práctica / Practice |
|---|---|---|
| 1 | [README.md](./README.md) | Entender alcance, stack y estructura. |
| 2 | [docs/landing/README.md](./docs/landing/README.md) | Revisar identidad, UI, capturas y Lighthouse. |
| 3 | [docs/architecture/system-design.md](./docs/architecture/system-design.md) | Dibujar el flujo de arquitectura. |
| 4 | [docs/infrastructure/lab-deployment.md](./docs/infrastructure/lab-deployment.md) | Analizar Nginx, Tailscale y TLS. |
| 5 | [docs/track-2/README.md](./docs/track-2/README.md) | Revisar evidencias heredadas del Track 2. |
| 6 | [docs/repository-publication-audit.md](./docs/repository-publication-audit.md) | Validar limpieza para repositorio público. |

---

## 🧪 Lab 1 - Ejecutar la landing / Run the landing

```powershell
cd D:\Desarrollo\Proyectos\UPB\Turismo-Cali-UPB
fnm use 24.14.0
npm install
npm run dev:frontend
```

**ES:** Abre `http://localhost:5173` y revisa el hero, menú móvil, experiencias, destinos y `/login`.
**EN:** Open `http://localhost:5173` and inspect the hero, mobile menu, experiences, destinations, and `/login`.

---

## 🧪 Lab 2 - Compilar / Build

```powershell
fnm use 24.14.0
npm run build:frontend
npm run build:backend
```

**Evidencia esperada / Expected evidence**

| ES | EN |
|---|---|
| TypeScript compila sin errores. | TypeScript compiles without errors. |
| Vite genera `frontend/dist`. | Vite generates `frontend/dist`. |
| El optimizador comprime imágenes. | The optimizer compresses images. |
| El backend genera `backend/dist`. | The backend generates `backend/dist`. |

---

## 🧪 Lab 3 - Backend base / Backend baseline

```powershell
fnm use 24.14.0
Copy-Item backend\.env.example backend\.env
npm run dev:backend
```

| Endpoint | ES | EN |
|---|---|---|
| `GET /api/health` | Estado del backend. | Backend status. |
| `POST /api/auth/login` | Autenticación LDAP/local. | LDAP/local authentication. |
| `GET /api/tourism/services` | Servicios turísticos. | Tourism services. |
| `POST /api/contact` | Contacto desde la landing. | Landing contact flow. |

---

## 🧪 Lab 4 - Despliegue de laboratorio / Lab deployment

| Elemento / Item | Valor / Value |
|---|---|
| Dominio / Domain | `ruta7rios.page` |
| IP Tailscale | `100.121.33.80` |
| Nginx | `1.26.3` |
| Directorio público / Public directory | `/var/www/ruta7rios` |
| Backend PM2 | `cali-backend` |
| Backend port | `127.0.0.1:3001` |

**ES:** `thisisunsafe` se documenta solo como bypass académico para un certificado autofirmado.
**EN:** `thisisunsafe` is documented only as an academic bypass for a self-signed certificate.

---

## 🔍 Evidencias que debes saber leer / Evidence to read

| Evidencia / Evidence | ES | EN |
|---|---|---|
| `nginx -t` | Configuración válida. | Valid configuration. |
| `systemctl status nginx` | Servicio activo. | Active service. |
| `ss -tlnp` | Puertos `80` y `443`. | Ports `80` and `443`. |
| `curl -kI https://ruta7rios.page/` | Frontend por HTTPS. | Frontend over HTTPS. |
| `curl -k https://ruta7rios.page/api/health` | Proxy hacia backend. | Proxy to backend. |
| Lighthouse | SEO, accesibilidad y rendimiento. | SEO, accessibility, and performance. |

---

## 💬 Preguntas de reflexión / Reflection questions

1. **ES:** ¿Qué riesgo tiene documentar `thisisunsafe` sin contexto?
   **EN:** What is the risk of documenting `thisisunsafe` without context?
2. **ES:** ¿Por qué la landing puede compilar sin backend, pero el flujo completo requiere API?
   **EN:** Why can the landing build without the backend, while the full flow still needs the API?
3. **ES:** ¿Qué archivos no deberían versionarse en un repositorio público?
   **EN:** Which files should never be committed to a public repository?
4. **ES:** ¿Qué cambiarías para usar HTTPS público real?
   **EN:** What would you change to use real public HTTPS?

---

## 🏁 Rúbrica corta / Short rubric

| Criterio / Criterion | Básico / Basic | Bueno / Good | Excelente / Excellent |
|---|---|---|---|
| Ejecución / Execution | Corre frontend. | Corre frontend y backend. | Compila, audita y explica resultados. |
| Arquitectura / Architecture | Reconoce carpetas. | Explica flujo API. | Relaciona red, seguridad y despliegue. |
| Documentación / Docs | Lee README. | Ubica evidencias. | Justifica decisiones y limitaciones. |
| Seguridad / Security | No sube `.env`. | Identifica secretos. | Propone CA confiable y hardening. |
