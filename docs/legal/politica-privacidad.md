# Política de Privacidad y Tratamiento de Datos Personales

**Consorcio Turístico "Ruta 7 Ríos"**
**Turismo Cali — Proyecto Integrador UPB**

Última actualización: Abril 2026

---

## 1. Responsable del Tratamiento

| Campo | Detalle |
|---|---|
| **Razón social** | Consorcio Turístico "Ruta 7 Ríos" |
| **Sede principal** | Santiago de Cali, Valle del Cauca, Colombia |
| **Correo de contacto** | privacidad@ruta7rios.co |
| **Proyecto académico** | Infraestructura WAN Corporativa — Track 2 (UPB) |

---

## 2. Marco Legal

Esta política se fundamenta en la normativa colombiana vigente sobre protección de datos personales:

- **Ley Estatutaria 1581 de 2012** — Régimen General de Protección de Datos Personales.
- **Decreto 1081 de 2015** (Título 2, Parte 2, Libro 2) — Decreto Único Reglamentario del sector Presidencia de la República, que compila las disposiciones reglamentarias sobre el Registro Nacional de Bases de Datos y los procedimientos de tratamiento de datos personales (anteriormente Decreto 1377 de 2013).
- **Ley 1266 de 2008** — Habeas Data financiero (en lo aplicable).

---

## 3. Definiciones

Conforme al artículo 3 de la Ley 1581 de 2012:

- **Dato personal**: Cualquier información vinculada o que pueda asociarse a una o varias personas naturales determinadas o determinables.
- **Titular**: Persona natural cuyos datos personales sean objeto de tratamiento.
- **Tratamiento**: Cualquier operación o conjunto de operaciones sobre datos personales, tales como la recolección, almacenamiento, uso, circulación o supresión.
- **Responsable del tratamiento**: Persona natural o jurídica que decide sobre la base de datos y/o el tratamiento de los datos.
- **Encargado del tratamiento**: Persona natural o jurídica que realice el tratamiento de datos personales por cuenta del responsable.
- **Autorización**: Consentimiento previo, expreso e informado del titular para llevar a cabo el tratamiento de datos personales.

---

## 4. Principios Rectores

El tratamiento de datos personales se rige por los principios establecidos en el artículo 4 de la Ley 1581 de 2012:

1. **Legalidad**: El tratamiento se sujeta a la ley colombiana vigente.
2. **Finalidad**: El tratamiento obedece a una finalidad legítima, la cual será informada al titular.
3. **Libertad**: El tratamiento solo puede ejercerse con el consentimiento previo, expreso e informado del titular.
4. **Veracidad o calidad**: La información sujeta a tratamiento debe ser veraz, completa, exacta, actualizada y comprobable.
5. **Transparencia**: Se garantiza al titular el derecho a obtener información acerca de la existencia de datos que le conciernan.
6. **Acceso y circulación restringida**: El tratamiento se sujeta a los límites derivados de la naturaleza de los datos.
7. **Seguridad**: La información se maneja con las medidas técnicas, humanas y administrativas necesarias para otorgar seguridad a los registros.
8. **Confidencialidad**: Las personas que intervienen en el tratamiento están obligadas a garantizar la reserva de la información.

---

## 5. Datos Recolectados

La plataforma "Ruta 7 Ríos" recolecta los siguientes datos personales según la funcionalidad utilizada:

### 5.1. Registro y Autenticación
- Nombre completo
- Correo electrónico institucional
- Número de documento de identidad
- Tipo de documento
- Credenciales de acceso (contraseña cifrada con bcrypt; autenticación LDAP/DA cuando aplique)

### 5.2. Navegación y Uso del Servicio
- Dirección IP de origen
- User-Agent del navegador
- Registros de auditoría (acciones realizadas, timestamps)

### 5.3. Servicios Turísticos
- Mensajes de contacto (nombre, correo, contenido del mensaje)
- Preferencias de servicios turísticos consultados

---

## 6. Finalidades del Tratamiento

Los datos personales serán utilizados para:

1. Gestionar el registro, autenticación y acceso a la plataforma.
2. Proveer y administrar los servicios turísticos ofrecidos por el consorcio.
3. Garantizar la trazabilidad y no repudio mediante registros de auditoría (conforme a las Historias de Usuario HU-70, HU-71 y HU-79 del proyecto).
4. Atender consultas, peticiones, quejas y reclamos (PQR).
5. Cumplir con obligaciones legales y requerimientos de autoridades competentes.
6. Fines estadísticos y académicos internos del proyecto UPB.

---

## 7. Autorización del Titular

De conformidad con el artículo 9 de la Ley 1581 de 2012, la recolección de datos personales requiere autorización previa, expresa e informada del titular. Dicha autorización se obtiene mediante:

- Aceptación del formulario de registro en la plataforma web.
- Consentimiento explícito al momento de enviar mensajes de contacto.

El titular podrá revocar la autorización en cualquier momento, enviando solicitud al correo **privacidad@ruta7rios.co**.

---

## 8. Derechos de los Titulares

Conforme al artículo 8 de la Ley 1581 de 2012, los titulares tienen derecho a:

1. **Conocer, actualizar y rectificar** sus datos personales.
2. **Solicitar prueba** de la autorización otorgada.
3. **Ser informado** sobre el uso que se ha dado a sus datos.
4. **Presentar quejas** ante la Superintendencia de Industria y Comercio (SIC) por infracciones a la ley.
5. **Revocar la autorización** y/o solicitar la **supresión** de los datos cuando no se respeten los principios, derechos y garantías constitucionales y legales.
6. **Acceder en forma gratuita** a sus datos personales que hayan sido objeto de tratamiento.

---

## 9. Medidas de Seguridad

Se implementan las siguientes medidas técnicas y organizativas para proteger los datos personales:

| Medida | Implementación |
|---|---|
| **Cifrado de contraseñas** | bcrypt con factor de costo 10 |
| **Autenticación LDAP/DA** | Integración con Active Directory corporativo |
| **Tokens JWT** | Sesiones con expiración configurable |
| **HTTPS/TLS** | Certificados SSL en servidor Nginx |
| **Headers de seguridad** | Helmet (CSP, HSTS, X-Frame-Options, X-Content-Type-Options) |
| **Sanitización XSS** | Middleware de limpieza de entradas |
| **Rate Limiting** | Protección contra fuerza bruta en endpoints de autenticación |
| **Auditoría** | Registro de acciones en base de datos y archivos de log (no repudio) |
| **Backups** | Respaldo periódico de base de datos y configuraciones críticas |
| **Control de acceso** | Roles (Admin/Usuario) con guardas de autenticación y autorización |

---

## 10. Transferencia y Transmisión de Datos

Los datos personales podrán ser transmitidos a:

- Servidores de base de datos MySQL alojados en infraestructura del proyecto.
- Servicios de autenticación LDAP/DA dentro de la red WAN corporativa (Track 2).

No se realizará transferencia internacional de datos personales salvo que sea requerido por ley, en cuyo caso se cumplirán los requisitos del Título VII de la Ley 1581 de 2012.

---

## 11. Vigencia de las Bases de Datos

Las bases de datos serán tratadas durante el tiempo razonable y necesario para cumplir las finalidades del tratamiento, considerando las disposiciones aplicables a la materia de que se trate y los aspectos administrativos, contables, fiscales, jurídicos e históricos de la información.

---

## 12. Procedimiento para Ejercer Derechos

El titular podrá ejercer sus derechos mediante comunicación dirigida a:

- **Correo electrónico**: privacidad@ruta7rios.co
- **Asunto**: "Ejercicio de derechos — Datos Personales"

La solicitud deberá contener:
1. Nombre completo e identificación del titular.
2. Descripción de los hechos y derechos que desea ejercer.
3. Dirección de correspondencia y/o correo electrónico para notificaciones.
4. Documentos que soporten la solicitud (si aplica).

**Plazos de respuesta** (conforme al artículo 15 de la Ley 1581 de 2012):
- Consultas: máximo **10 días hábiles** (prorrogable por 5 días hábiles adicionales).
- Reclamos: máximo **15 días hábiles** (prorrogable por 8 días hábiles adicionales).

---

## 13. Modificaciones

"Ruta 7 Ríos" se reserva el derecho de modificar esta política en cualquier momento. Las modificaciones serán notificadas a los titulares a través de la plataforma web y/o correo electrónico registrado.

---

## 14. Contacto

Para cualquier consulta relacionada con esta política:

| Canal | Detalle |
|---|---|
| **Correo** | privacidad@ruta7rios.co |
| **Proyecto académico** | Universidad Pontificia Bolivariana — Seccional Bucaramanga |
| **Sede operativa** | Santiago de Cali, Valle del Cauca |

---

> **Nota**: Este documento tiene carácter académico y forma parte del proyecto integrador de Infraestructura WAN Corporativa (Track 2). En un entorno productivo real, deberá ser revisado por un profesional de derecho especializado en protección de datos personales y registrado ante la Superintendencia de Industria y Comercio (SIC) conforme al Registro Nacional de Bases de Datos (RNBD).
