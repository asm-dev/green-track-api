import { Router } from "express";
import * as reportCtrl from "../controllers/report-controller.js";
import { cache } from "../middlewares/cache-middleware.js";

const router = Router();

router.get("/", reportCtrl.getAll);
router.get("/active", cache("/reports/active"), reportCtrl.getActive);
router.post("/", reportCtrl.create);
router.put("/:id", reportCtrl.update);
router.delete("/:id", reportCtrl.remove);

export default router;
