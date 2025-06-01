# GreenTrack API

<p align="center">
  <img src="./assets/logo_no_msg.png" width="200" alt="Green Track API Logo" />
</p>

GreenTrack es una API REST construida con **Node.js** que permite a usuarios reportar la presencia de basura en entornos naturales como bosques, playas o caminos rurales, y organizar eventos comunitarios para su limpieza. A través de esta plataforma, los usuarios pueden contribuir activamente a la preservación del medio ambiente, generando reportes geolocalizados y compartiendo imágenes del antes y después de cada limpieza.

Desde el punto de vista técnico, la API está conectada a una base de datos relacional **PostgreSQL** mediante Sequelize, donde se gestionan los reportes y eventos. Los registros menos estructurados como logs de inscripciones de voluntarios se almacenan en una base de datos NoSQL **MongoDB**. **Redis** se utiliza como sistema de caché para optimizar el acceso a los listados más frecuentes como reportes activos y eventos próximos, mejorando significativamente el rendimiento y reduciendo la carga en las bases de datos. El caché tiene un TTL de 30 minutos y se invalida automáticamente ante actualizaciones o eliminaciones.

## Tecnologías utilizadas

- **Node.js + Express**, framework backend ligero y robusto.
- **PostgreSQL (Sequelize)**, base de datos relacional para reportes y eventos.
- **MongoDB (Mongoose)**, base de datos NoSQL para voluntarios y comentarios.
- **Redis**, sistema de cache in-memory para mejorar el rendimiento.
- **Docker**, contenedores de servicios que facilitan el despliegue.

## Estructura del proyecto

```
green-track/
├── config/                # Conexiones a PostgreSQL, MongoDB, Redis
├── controllers/           # Lógica de negocio
├── models/                # Modelos de bases de datos (SQL y NoSQL)
├── routes/                # Endpoints
├── middlewares/           # Lógica de cache Redis
├── app.js
├── server.js
├── docker-compose.yml     # Contenedores de base de datos y cache
├── .env.example
└── docs/
    └── postman_collection.json  # Colección para pruebas en Postman
```

## Instalación y uso

1. Clona el repositorio e instala las dependencias
2. Crea tu .env, recomiendo copiar el de ejemplo `cp .env.example .env`
3. Crea las imágenes y levanta los contenedores de bases de datos y cache `docker compose up -d`
5. Ejecuta la API con `npm run dev`
6. (*Opcional*) Puedes probar la API en Postman facilimente si importas el archivo `docs/postman_collection.json` como colección.

![image](https://github.com/user-attachments/assets/dd8e3cd2-4f5b-4730-bf98-3d6489db52dd)


### Endpoints disponibles

| Recurso     | Método | Endpoint               | Descripción                                                |
| ----------- | ------ | ---------------------- | ---------------------------------------------------------- |
| Informes | GET    | `/reports`             | Obtener todos los informes                                 |
|             | GET    | `/reports/active`      | Obtener informes activos (con cache Redis)                 |
|             | POST   | `/reports`             | Crear un nuevo informe                                     |
|             | PUT    | `/reports/:id`         | Actualizar el estado de un informe                         |
|             | DELETE | `/reports/:id`         | Eliminar un informe                                        |
| Eventos     | GET    | `/events/upcoming`     | Obtener eventos de recogida de basura próximos (cacheados) |
|             | POST   | `/events`              | Crear un nuevo evento                                      |
| Voluntarios | GET    | `/volunteers/:eventId` | Obtener voluntarios inscritos en un evento                 |
|             | POST   | `/volunteers`          | Inscribir un voluntario a un evento                        |

## Reflexiones del desarrollo

**¿Por qué SQL para reportes y eventos?**

Los reportes y eventos tienen una estructura estable, relacional y bien definida (campos obligatorios como `status`, `location`, `date`), lo que se adapta perfectamente a una base de datos relacional como PostgreSQL. Además, permite integridad referencial y consultas complejas fácilmente.

**¿Por qué MongoDB para voluntarios y comentarios?**

Los registros de voluntarios y comentarios son más flexibles y no requieren relaciones estrictas. MongoDB permite insertar documentos rápidamente, sin migraciones, y escalar bien en volumen alto.

**¿Por qué Redis?**

Redis se usa para cachear los endpoints más consultados (`/reports/active` y `/events/upcoming`), lo que:

- Reduce el tiempo de respuesta considerablemente.
- Disminuye la carga sobre PostgreSQL.
- Aumenta la escalabilidad general de la API.

Los datos cacheados se invalidan automáticamente al crear, actualizar o eliminar elementos que los afecten.
