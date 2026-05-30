# 🤝 Contribución / Contributing

> **ES:** Guía para colaborar sin romper la trazabilidad académica ni la seguridad del repositorio público.
> **EN:** Guide to contribute without breaking academic traceability or public-repository security.

---

## 🧰 Prerrequisitos / Prerequisites

| ES | EN |
|---|---|
| Windows 11, Linux o WSL. | Windows 11, Linux, or WSL. |
| Node.js con `fnm`. | Node.js managed with `fnm`. |
| Versión recomendada `24.14.0`. | Recommended version `24.14.0`. |
| MySQL 8 si vas a ejecutar backend completo. | MySQL 8 if you run the full backend. |

```powershell
fnm use 24.14.0
npm install
```

---

## 🌿 Flujo de trabajo / Workflow

```powershell
git checkout -b feat/hu-XX-descripcion-corta
fnm use 24.14.0
npm run dev:frontend
```

Si tocas backend / If you touch the backend:

```powershell
fnm use 24.14.0
Copy-Item backend\.env.example backend\.env
npm run dev:backend
```

Antes del PR / Before PR:

```powershell
fnm use 24.14.0
npm run build:frontend
npm run build:backend
npm audit --audit-level=high
```

---

## 📝 Commits

Formato / Format:

```text
<tipo>(<ámbito>): <descripción corta en minúsculas>
```

| Tipo / Type | ES | EN |
|---|---|---|
| `feat` | Nueva funcionalidad. | New feature. |
| `fix` | Corrección de bug. | Bug fix. |
| `docs` | Documentación. | Documentation. |
| `style` | Formato sin cambio funcional. | Formatting without behavior change. |
| `refactor` | Reorganización interna. | Internal restructuring. |
| `test` | Pruebas. | Tests. |
| `chore` | Mantenimiento. | Maintenance. |

Ejemplos / Examples:

```text
feat(landing): agregar destinos destacados
fix(auth): corregir fallback local
docs(readme): actualizar guia bilingue
chore(frontend): ignorar artefactos generados
```

---

## 🧑‍💻 Código / Code

| Área / Area | ES | EN |
|---|---|---|
| TypeScript | Tipado estricto; evitar `any`. | Strict typing; avoid `any`. |
| Frontend | Componentes funcionales, Tailwind, accesibilidad. | Functional components, Tailwind, accessibility. |
| Backend | Express, Prisma, validación y auditoría. | Express, Prisma, validation, and audit logging. |
| Seguridad | Sin secretos hardcodeados. | No hardcoded secrets. |
| Docs | Markdown bilingüe para documentos públicos. | Bilingual Markdown for public docs. |

---

## 🛡️ Seguridad antes del PR / Security before PR

- **ES:** No subir `.env`, llaves privadas, dumps ni capturas con credenciales.
  **EN:** Do not commit `.env`, private keys, dumps, or screenshots with credentials.
- **ES:** Revisar `git diff --stat` para detectar binarios grandes.
  **EN:** Review `git diff --stat` to catch large binaries.
- **ES:** Si tocas Nginx, documenta `nginx -t`, `curl` y logs.
  **EN:** If you touch Nginx, document `nginx -t`, `curl`, and logs.

---

## ✅ Checklist

- [ ] `fnm use 24.14.0`
- [ ] Build frontend/backend según alcance / Build frontend/backend as needed
- [ ] Documentación actualizada / Documentation updated
- [ ] Sin secretos ni artefactos generados / No secrets or generated artifacts
- [ ] Conventional Commit válido / Valid Conventional Commit
