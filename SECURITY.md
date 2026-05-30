# 🔐 Seguridad / Security

> **ES:** Política de seguridad para el repositorio público Ruta 7 Ríos.
> **EN:** Security policy for the public Ruta 7 Ríos repository.

---

## ✅ Versiones soportadas / Supported versions

| Versión / Version | Soporte / Support |
|---|---|
| `main` | ✅ |
| ramas anteriores / older branches | ❌ |

---

## 🚨 Reportar vulnerabilidades / Reporting vulnerabilities

**ES:** No abras issues públicos para vulnerabilidades. Contacta a los mantenedores o escribe a `turismo-cali-upb@upb.edu.co`.
**EN:** Do not open public issues for vulnerabilities. Contact the maintainers or write to `turismo-cali-upb@upb.edu.co`.

Incluye / Include:

- **ES:** Descripción clara y pasos de reproducción.
  **EN:** Clear description and reproduction steps.
- **ES:** Impacto potencial.
  **EN:** Potential impact.
- **ES:** Sugerencia de mitigación si la tienes.
  **EN:** Suggested mitigation if available.

---

## 🛡️ Controles del proyecto / Project controls

| Control | ES | EN |
|---|---|---|
| Helmet | Headers HTTP de seguridad. | HTTP security headers. |
| CORS | Restricción de orígenes. | Origin restrictions. |
| Rate limiting | Protección básica ante abuso. | Basic abuse protection. |
| JWT + bcrypt | Autenticación y hashing. | Authentication and hashing. |
| Prisma | Queries parametrizadas. | Parameterized queries. |
| Nginx | Reverse proxy y TLS de laboratorio. | Reverse proxy and lab TLS. |
| Audit log | Trazabilidad de acciones sensibles. | Traceability for sensitive actions. |

---

## ⚠️ Nota sobre laboratorio / Lab note

**ES:** El bypass `thisisunsafe` documentado en [docs/infrastructure/lab-deployment.md](./docs/infrastructure/lab-deployment.md) es una nota histórica del laboratorio. No debe usarse como práctica de producción.
**EN:** The `thisisunsafe` bypass documented in [docs/infrastructure/lab-deployment.md](./docs/infrastructure/lab-deployment.md) is historical lab context. It must not be used as a production practice.

---

## 🚫 Nunca publicar / Never publish

| ES | EN |
|---|---|
| Archivos `.env` reales. | Real `.env` files. |
| Llaves privadas TLS. | TLS private keys. |
| Dumps de base de datos. | Database dumps. |
| Tokens o credenciales. | Tokens or credentials. |
| Capturas con información sensible. | Screenshots with sensitive information. |

---

## 📦 Dependencias / Dependencies

**ES:** Se usa `npm audit --audit-level=high` como verificación mínima. Las vulnerabilidades moderadas se tratan según impacto y costo de actualización.
**EN:** `npm audit --audit-level=high` is used as the minimum verification. Moderate advisories are handled according to impact and upgrade cost.
