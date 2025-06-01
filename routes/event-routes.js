import { Router } from "express";
import * as eventCtrl from "../controllers/event-controller.js";
import { cache } from "../middlewares/cache-middleware.js";

const router = Router();

router.get("/upcoming", cache("/events/upcoming"), eventCtrl.getUpcoming);
router.post("/", eventCtrl.create);

export default router;
