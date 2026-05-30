# 📚 Documentación / Documentation

> **ES:** Índice bilingüe de la documentación pública de Ruta 7 Ríos.
> **EN:** Bilingual index for the public Ruta 7 Ríos documentation.

---

## 🧭 Mapa rápido / Quick map

| Área / Area | Documento / Document | ES | EN |
|---|---|---|---|
| 🧱 Arquitectura | [architecture/system-design.md](./architecture/system-design.md) | Diseño del sistema, monorepo, API, Prisma, LDAP y Nginx. | System design, monorepo, API, Prisma, LDAP, and Nginx. |
| 🚀 Infraestructura | [infrastructure/local-deployment-guide.md](./infrastructure/local-deployment-guide.md) | Guía local para desarrollo y pruebas. | Local guide for development and testing. |
| 🛰️ Laboratorio | [infrastructure/lab-deployment.md](./infrastructure/lab-deployment.md) | Despliegue histórico con Tailscale, Nginx y TLS. | Historical deployment with Tailscale, Nginx, and TLS. |
| 🎨 Landing | [landing/README.md](./landing/README.md) | Identidad, UI, SEO, accesibilidad y capturas. | Identity, UI, SEO, accessibility, and screenshots. |
| ⚖️ Legal | [legal/politica-privacidad.md](./legal/politica-privacidad.md) | Política de privacidad académica. | Academic privacy policy. |
| 🌐 Red WAN | [network/external-services-client-guide.md](./network/external-services-client-guide.md) | Consumo de VoIP, Proxy y DNS. | VoIP, Proxy, and DNS client usage. |
| 🧾 Track 2 | [track-2/README.md](./track-2/README.md) | Evidencias migradas del Track 2. | Migrated Track 2 evidence. |
| 🔎 Auditoría | [repository-publication-audit.md](./repository-publication-audit.md) | Limpieza y publicación del repo. | Repository cleanup and publication audit. |

---

## 🇪🇸 Criterio de migración

Se migró completo `Simulador-Credito-UPB/docs/track 2` porque contiene evidencia propia del consorcio turístico: topología WAN, Nginx, HTTPS, Proxy, DNS, DHCP, Mail, VoIP y monitoreo.

No se migró el resto de `docs/` del simulador porque pertenece al dominio de crédito educativo, despliegue CTIC, datos financieros o pruebas que no explican este producto.

## 🇬🇧 Migration rule

The full `Simulador-Credito-UPB/docs/track 2` directory was migrated because it contains evidence that belongs to the tourism consortium: WAN topology, Nginx, HTTPS, Proxy, DNS, DHCP, Mail, VoIP, and monitoring.

The rest of the simulator documentation was not migrated because it belongs to the educational credit domain, CTIC deployment, financial data, or tests that do not explain this product.

---

## ✍️ Estilo documental / Documentation style

| ES | EN |
|---|---|
| Escribir títulos claros y accionables. | Write clear, actionable headings. |
| Mantener secciones bilingües cuando el documento sea público. | Keep bilingual sections when the document is public. |
| Usar imágenes solo cuando ayuden a entender el producto o la evidencia. | Use images only when they help explain the product or evidence. |
| Evitar rutas con espacios en documentos nuevos. | Avoid paths with spaces in new documents. |
| Conservar evidencia original en `track-2`. | Preserve original evidence under `track-2`. |

---

## 🛤️ Lectura recomendada / Recommended reading

1. [README principal / Main README](../README.md)
2. [LEARN.md](../LEARN.md)
3. [landing/README.md](./landing/README.md)
4. [infrastructure/lab-deployment.md](./infrastructure/lab-deployment.md)
5. [track-2/README.md](./track-2/README.md)
