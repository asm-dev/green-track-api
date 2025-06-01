import express from "express";
import "./config/mongo.js";
import "./models/report-model.js";
import eventRoutes from "./routes/event-routes.js";
import reportRoutes from "./routes/report-routes.js";
import volunteerRoutes from "./routes/volunteer-routes.js";

const app = express();
app.use(express.json());

app.use("/reports", reportRoutes);
app.use("/volunteers", volunteerRoutes);
app.use("/events", eventRoutes);

export default app;
