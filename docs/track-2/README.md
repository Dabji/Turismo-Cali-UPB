# 🧾 Track 2: Evidencias de Red / Networking Evidence

> **ES:** Este directorio preserva la evidencia técnica del Track 2 de Redes para Ruta 7 Ríos, ahora organizada para una lectura pública, bilingüe y trazable.
> **EN:** This directory preserves the Networking Track 2 technical evidence for Ruta 7 Ríos, now organized for public, bilingual, and traceable reading.

![Hero Ruta 7 Ríos](https://github.com/user-attachments/assets/f6c97d1f-02e1-4e84-84a4-1ed740248df9)

---

## 📍 Origen / Source

```text
D:\Desarrollo\Proyectos\UPB\Simulador-Credito-UPB\docs\track 2
```

| ES | EN |
|---|---|
| Se migró desde el repositorio del simulador porque esta evidencia pertenece al consorcio turístico Ruta 7 Ríos. | It was migrated from the simulator repository because this evidence belongs to the Ruta 7 Ríos tourism consortium. |
| El material cubre sede Cali, WAN nacional, servicios corporativos y despliegue web. | The material covers the Cali site, national WAN, corporate services, and web deployment. |
| Los documentos binarios se conservan para trazabilidad académica; los Markdown se prepararon para consulta pública. | Binary documents are preserved for academic traceability; Markdown files were prepared for public review. |

---

## 🗂️ Mapa de Evidencias / Evidence Map

| Recurso / Resource | Español | English |
|---|---|---|
| `Cali.txt` | Configuración base de router y switch de la sede Cali. | Base router and switch configuration for the Cali site. |
| `topología_proyecto.pkt` | Topología Packet Tracer del laboratorio WAN. | Packet Tracer topology for the WAN lab. |
| `TOPOLOGIA WAN TURISMOXCOLOMBIA (2).pptx` | Presentación de la topología WAN. | WAN topology slide deck. |
| `Documento de Definición de Requerimientos y Alcance de Red.docx` | Alcance y requerimientos de red. | Network scope and requirements. |
| `HU-61-network-architecture-design.docx` | Diseño de arquitectura de red. | Network architecture design. |
| `HU-62-network-config.docx` | Configuración técnica de red. | Technical network configuration. |
| `DHCP/` | Servicio DHCP. | DHCP service. |
| `DNS/` | Implementación y manual DNS. | DNS implementation and manual. |
| `FTP/` | Servicio FTP. | FTP service. |
| `HTTPS/` | Landing, Nginx, TLS y manual técnico. | Landing page, Nginx, TLS, and technical manual. |
| `MAIL/` | Evidencia de correo/Postfix. | Mail/Postfix evidence. |
| `PROXY/` | Cliente proxy, navegación y logs. | Proxy client, browsing, and logs. |
| `SERVICES-MONITORING/` | Monitoreo básico de servicios. | Basic service monitoring. |
| `VoIP/` | Telefonía IP. | IP telephony. |

---

## 🔗 Lectura Recomendada / Recommended Reading

| Documento / Document | Español | English |
|---|---|---|
| [HTTPS/HU-70_HTTPS_TLS.md](./HTTPS/HU-70_HTTPS_TLS.md) | Habilitación HTTPS/TLS con certificado autofirmado. | HTTPS/TLS enablement with a self-signed certificate. |
| [HTTPS/HU-78_Despliegue_Landing.md](./HTTPS/HU-78_Despliegue_Landing.md) | Publicación funcional de la landing. | Functional landing page publication. |
| [HTTPS/HU-79_Configuracion_Servidor_Web.md](./HTTPS/HU-79_Configuracion_Servidor_Web.md) | Configuración operativa de Nginx. | Operational Nginx configuration. |
| [HTTPS/HU-80_Evidencias_y_Manual.md](./HTTPS/HU-80_Evidencias_y_Manual.md) | Evidencias finales y manual técnico. | Final evidence and technical manual. |
| [PROXY/HU-65-proxy-client.md](./PROXY/HU-65-proxy-client.md) | Validación del cliente proxy. | Proxy client validation. |

---

## 🛡️ Nota de Publicación / Publication Note

**ES:** No se versionaron llaves privadas TLS, archivos `.env`, dumps de base de datos ni credenciales. Las rutas como `/etc/nginx/ssl/ruta7rios.key` son referencias operativas de la VM, no archivos incluidos en el repositorio.

**EN:** No TLS private keys, `.env` files, database dumps, or credentials were committed. Paths such as `/etc/nginx/ssl/ruta7rios.key` are VM operational references, not repository files.
