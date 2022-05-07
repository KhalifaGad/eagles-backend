import { Router } from "express";
import { vehicleController } from "../controllers";

const router = Router();

router.route("/vehicles").get(vehicleController.list);

router.route("/vehicle").post(vehicleController.create);

router.route("/vehicle/:id").get(vehicleController.show).put(vehicleController.update);

export default router;
