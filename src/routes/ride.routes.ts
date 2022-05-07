import { Router } from "express";
import { rideController } from "../controllers";

const router = Router();

router.route("/rides").get(rideController.list);

router.route("/ride").post(rideController.create);

router.route("/ride/:id").get(rideController.show).put(rideController.update);

export default router;
