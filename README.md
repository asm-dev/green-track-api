# GreenTrack API

<p align="center">
  <img src="./assets/logo_no_msg.png" width="200" alt="Emotion API Logo" />
</p>

GreenTrack es una API REST construida con **Node.js** que permite a usuarios reportar la presencia de basura en entornos naturales como bosques, playas o caminos rurales, y organizar eventos comunitarios para su limpieza. A través de esta plataforma, los usuarios pueden contribuir activamente a la preservación del medio ambiente, generando reportes geolocalizados y compartiendo imágenes del antes y después de cada limpieza.

Desde el punto de vista técnico, la API está conectada a una base de datos relacional **PostgreSQL** mediante Sequelize, donde se gestionan los reportes y eventos. Los registros menos estructurados como logs de inscripciones de voluntarios se almacenan en una base de datos NoSQL **MongoDB**. **Redis** se utiliza como sistema de caché para optimizar el acceso a los listados más frecuentes como reportes activos y eventos próximos, mejorando significativamente el rendimiento y reduciendo la carga en las bases de datos. El caché tiene un TTL de 30 minutos y se invalida automáticamente ante actualizaciones o eliminaciones.
