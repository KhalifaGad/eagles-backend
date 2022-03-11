import { Router } from "express";
import { vehiclesController } from "../controllers";

const router = Router();

router.route("/vehicles").get(vehiclesController.list);

router.route("/vehicle").post(vehiclesController.create);

export default router;
