# GreenTrack API

<p align="center">
  <img src="./assets/logo_no_msg.png" width="200" alt="Green Track API Logo" />
</p>

GreenTrack is a **Node.js** REST API that allows users to report litter in natural environments such as forests, beaches, and rural roads, and organize community cleanup events. Through this platform, users can actively contribute to environmental preservation by creating geolocated reports and sharing before-and-after photos of each cleanup.

From a technical perspective, the API connects to a **PostgreSQL** relational database through Sequelize, where reports and events are managed. Less structured records, such as volunteer registration logs, are stored in a **MongoDB** NoSQL database. **Redis** is used as a caching system to optimize access to frequently requested lists, such as active reports and upcoming events, significantly improving performance and reducing database load. The cache has a 30-minute TTL and is automatically invalidated when records are updated or deleted.

## Technologies used

- **Node.js + Express**, a lightweight and robust backend framework.
- **PostgreSQL (Sequelize)**, a relational database for reports and events.
- **MongoDB (Mongoose)**, a NoSQL database for volunteers and comments.
- **Redis**, an in-memory caching system to improve performance.
- **Docker**, service containers that simplify deployment.

## Project structure

```
green-track/
├── config/                # Connections to PostgreSQL, MongoDB, and Redis
├── controllers/           # Business logic
├── models/                # Database models (SQL and NoSQL)
├── routes/                # Endpoints
├── middlewares/           # Redis caching logic
├── app.js
├── server.js
├── docker-compose.yml     # Database and cache containers
├── .env.example
└── docs/
    └── postman_collection.json  # Postman testing collection
```

## Installation and usage

1. Clone the repository and install the dependencies.
2. Create your `.env` file. I recommend copying the example: `cp .env.example .env`.
3. Build the images and start the database and cache containers: `docker compose up -d`.
4. Run the API with `npm run dev`.
5. (*Optional*) You can easily test the API in Postman by importing `docs/postman_collection.json` as a collection.

![image](https://github.com/user-attachments/assets/dd8e3cd2-4f5b-4730-bf98-3d6489db52dd)


### Available endpoints

| Resource     | Method | Endpoint               | Description                                                    |
| ------------ | ------ | ---------------------- | -------------------------------------------------------------- |
| Reports      | GET    | `/reports`             | Get all reports                                                |
|              | GET    | `/reports/active`      | Get active reports (cached with Redis)                         |
|              | POST   | `/reports`             | Create a new report                                            |
|              | PUT    | `/reports/:id`         | Update a report's status                                       |
|              | DELETE | `/reports/:id`         | Delete a report                                                |
| Events       | GET    | `/events/upcoming`     | Get upcoming litter cleanup events (cached)                    |
|              | POST   | `/events`              | Create a new event                                             |
| Volunteers   | GET    | `/volunteers/:eventId` | Get volunteers registered for an event                         |
|              | POST   | `/volunteers`          | Register a volunteer for an event                              |

## Development notes

**Why SQL for reports and events?**

Reports and events have a stable, relational, and well-defined structure (required fields such as `status`, `location`, and `date`), which makes them a good fit for a relational database such as PostgreSQL. It also provides referential integrity and makes complex queries easy.

**Why MongoDB for volunteers and comments?**

Volunteer and comment records are more flexible and do not require strict relationships. MongoDB allows documents to be inserted quickly, without migrations, and scales well with high volumes.

**Why Redis?**

Redis is used to cache the most frequently requested endpoints (`/reports/active` and `/events/upcoming`), which:

- Significantly reduces response times.
- Decreases the load on PostgreSQL.
- Improves the API's overall scalability.

Cached data is automatically invalidated when the items that affect it are created, updated, or deleted.
