# 🔎 Auditoría para Publicación / Publication Audit

> **ES:** Registro de decisiones para dejar el repositorio público.
> **EN:** Decision log for preparing the repository for public release.

---

## 🧭 Decisión de migración / Migration decision

| Origen / Source | Decisión / Decision | ES | EN |
|---|---|---|---|
| `Simulador-Credito-UPB/docs/track 2` | Migrado / Migrated | Pertenece al consorcio Ruta 7 Ríos. | Belongs to the Ruta 7 Ríos consortium. |
| `deployment/` | No migrado / Not migrated | Despliegue CTIC del simulador. | CTIC simulator deployment. |
| `database/` | No migrado / Not migrated | Datos del simulador de crédito. | Educational credit simulator data. |
| `financial-guidelines/` | No migrado / Not migrated | Dominio financiero ajeno al turismo. | Financial domain unrelated to tourism. |
| `architecture/` del simulador | No migrado / Not migrated | Arquitectura del simulador. | Simulator architecture. |

---

## 🧹 Limpieza aplicada / Cleanup applied

| Archivo / File | Acción / Action | ES | EN |
|---|---|---|---|
| `frontend/tsconfig*.tsbuildinfo` | Eliminado | Artefactos generados por TypeScript. | TypeScript generated artifacts. |
| `frontend/vite.config.js` | Eliminado | Salida generada desde `vite.config.ts`. | Output generated from `vite.config.ts`. |
| `frontend/vite.config.d.ts` | Eliminado | Declaración generada. | Generated declaration. |
| `Ruta 7 Rios CALI 2.0.png` | Eliminado | Imagen pesada no usada. | Heavy unused image. |
| `logoFooter.png` | Eliminado | Reemplazado por `logoFooterColor2.png`. | Replaced by `logoFooterColor2.png`. |
| `.gitignore` | Actualizado | Evita builds, logs, cache y artefactos. | Prevents builds, logs, cache, and artifacts. |

---

## 🧩 Dependencias ajustadas / Dependency adjustments

| Dependencia / Dependency | Motivo / Reason |
|---|---|
| `sharp` | Necesaria para optimizar JPG/PNG con `vite-plugin-image-optimizer`. |
| `svgo` | Necesaria para optimizar SVG con `vite-plugin-image-optimizer`. |

**ES:** Sin estas peer dependencies, Vite compilaba con exit `0`, pero el optimizador reportaba errores.
**EN:** Without these peer dependencies, Vite exited with `0`, but the optimizer reported errors.

---

## 🔐 Revisión de secretos / Secret review

| Check | Resultado / Result |
|---|---|
| `.env` reales / real `.env` files | No encontrados / Not found |
| Llaves privadas / Private keys | No encontradas / Not found |
| Dumps de BD / DB dumps | No encontrados / Not found |
| Workflows | Usan `secrets.*`, no valores hardcodeados. |
| Certificados | Solo rutas documentadas; no llaves versionadas. |

---

## ✅ Estado público recomendado / Recommended public state

| ES | EN |
|---|---|
| README bilingüe y navegable. | Bilingual and navigable README. |
| LEARN.md listo para GitHub Education. | LEARN.md ready for GitHub Education. |
| Evidencia Track 2 migrada y enlazada. | Track 2 evidence migrated and linked. |
| Limitación de `thisisunsafe` explicada. | `thisisunsafe` limitation explained. |
| Artefactos generados removidos. | Generated artifacts removed. |
| Assets no usados removidos. | Unused assets removed. |

---

## 🧾 Pendientes no bloqueantes / Non-blocking follow-ups

- **ES:** Resolver las vulnerabilidades moderadas restantes de `vite/esbuild` cuando se valide el salto mayor propuesto por `npm audit fix --force`.
  **EN:** Resolve the remaining moderate `vite/esbuild` advisories once the major upgrade proposed by `npm audit fix --force` is validated.
- **ES:** Reemplazar TLS autofirmado por CA confiable si el sitio sale del laboratorio.
  **EN:** Replace self-signed TLS with a trusted CA if the site leaves the lab.
- **ES:** Agregar pruebas automatizadas para componentes y endpoints.
  **EN:** Add automated tests for components and endpoints.
