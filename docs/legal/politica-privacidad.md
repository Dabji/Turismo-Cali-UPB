# 🔐 Política de Privacidad / Privacy Policy

**Consorcio Turístico "Ruta 7 Ríos" / "Ruta 7 Ríos" Tourism Consortium**
**Proyecto Integrador UPB / UPB Integrative Project**
**Última actualización / Last updated:** abril de 2026 / April 2026

> **ES:** Este documento resume cómo se tratan los datos personales dentro del prototipo académico Ruta 7 Ríos.
> **EN:** This document summarizes how personal data is handled inside the academic Ruta 7 Ríos prototype.

---

## 1. Responsable / Data Controller

| Campo / Field | Español | English |
|---|---|---|
| Nombre / Name | Consorcio Turístico "Ruta 7 Ríos" | "Ruta 7 Ríos" Tourism Consortium |
| Sede / Location | Santiago de Cali, Valle del Cauca, Colombia | Santiago de Cali, Valle del Cauca, Colombia |
| Contacto / Contact | `privacidad@ruta7rios.co` | `privacidad@ruta7rios.co` |
| Contexto / Context | Proyecto académico de infraestructura WAN y aplicación web | Academic WAN infrastructure and web application project |

---

## 2. Marco Legal / Legal Framework

**ES:** La política toma como referencia la normativa colombiana aplicable al tratamiento de datos personales, especialmente la Ley 1581 de 2012, el Decreto 1081 de 2015 y la Ley 1266 de 2008 cuando resulte pertinente.

**EN:** This policy references Colombian personal-data regulations, especially Law 1581 of 2012, Decree 1081 of 2015, and Law 1266 of 2008 where applicable.

---

## 3. Datos Tratados / Data Processed

| Categoría / Category | Español | English |
|---|---|---|
| Identificación | Nombre, correo, documento y tipo de documento. | Name, email, ID number, and ID type. |
| Autenticación | Contraseña cifrada con bcrypt y tokens de sesión. | bcrypt-hashed password and session tokens. |
| Navegación | Dirección IP, user-agent y marcas de tiempo. | IP address, user agent, and timestamps. |
| Auditoría | Acciones relevantes para trazabilidad técnica. | Relevant actions for technical traceability. |
| Contacto turístico | Mensajes, preferencias o solicitudes enviadas por el usuario. | Messages, preferences, or requests sent by the user. |

---

## 4. Finalidades / Purposes

| Español | English |
|---|---|
| Permitir registro, inicio de sesión y gestión básica de usuarios. | Enable registration, login, and basic user management. |
| Operar servicios turísticos demostrativos del prototipo. | Operate demonstrative tourism services in the prototype. |
| Proteger la plataforma mediante auditoría, logs y controles de seguridad. | Protect the platform through audit logs and security controls. |
| Documentar evidencias académicas del despliegue y la red. | Document academic evidence for deployment and networking work. |
| Mejorar accesibilidad, rendimiento y experiencia de usuario. | Improve accessibility, performance, and user experience. |

---

## 5. Principios / Principles

**ES:** El tratamiento se rige por legalidad, finalidad, libertad, veracidad, transparencia, acceso restringido, seguridad y confidencialidad.

**EN:** Processing follows legality, purpose limitation, freedom of choice, accuracy, transparency, restricted access, security, and confidentiality.

---

## 6. Seguridad / Security

| Control | Español | English |
|---|---|---|
| `bcrypt` | Contraseñas almacenadas como hash, no en texto plano. | Passwords stored as hashes, not plain text. |
| JWT | Sesiones protegidas con tokens firmados. | Sessions protected with signed tokens. |
| Helmet + CORS | Cabeceras HTTP y orígenes controlados. | HTTP headers and controlled origins. |
| Prisma | Consultas parametrizadas hacia la base de datos. | Parameterized database queries. |
| Nginx | Reverse proxy y evidencia de TLS de laboratorio. | Reverse proxy and lab TLS evidence. |
| `.gitignore` | Exclusión de `.env`, dumps, logs y artefactos generados. | Exclusion of `.env`, dumps, logs, and generated artifacts. |

---

## 7. Derechos del Titular / Data Subject Rights

| Español | English |
|---|---|
| Conocer, actualizar, rectificar o solicitar eliminación de datos. | Know, update, correct, or request deletion of data. |
| Solicitar información sobre el tratamiento realizado. | Request information about the processing performed. |
| Revocar autorizaciones cuando aplique. | Revoke authorizations where applicable. |
| Presentar consultas o reclamos al contacto del proyecto. | Submit questions or complaints to the project contact. |

---

## 8. Conservación / Retention

**ES:** Los datos del prototipo se conservan únicamente durante el ciclo académico y de mantenimiento del repositorio. Las evidencias públicas no deben incluir credenciales, secretos, datos sensibles ni llaves privadas.

**EN:** Prototype data is retained only during the academic and repository-maintenance cycle. Public evidence must not include credentials, secrets, sensitive data, or private keys.

---

## 9. Transferencias / Sharing

**ES:** El proyecto no comercializa datos personales. La información puede compartirse internamente con docentes o integrantes autorizados para revisión académica, soporte técnico y validación de evidencias.

**EN:** The project does not sell personal data. Information may be shared internally with teachers or authorized team members for academic review, technical support, and evidence validation.

---

## 10. Nota Académica / Academic Note

**ES:** Ruta 7 Ríos es un prototipo académico. Antes de convertirlo en un servicio productivo real, se debe ejecutar una revisión legal, de seguridad, retención de datos, consentimiento y continuidad operacional.

**EN:** Ruta 7 Ríos is an academic prototype. Before turning it into a real production service, a legal, security, data-retention, consent, and operational-continuity review must be completed.
