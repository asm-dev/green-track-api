import { Router } from "express";
import * as volunteerCtrl from "../controllers/volunteer-controller.js";

const router = Router();

router.get("/:eventId", volunteerCtrl.getVolunteers);
router.post("/", volunteerCtrl.signup);

export default router;
