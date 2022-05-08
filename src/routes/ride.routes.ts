import { Router } from "express";
import { rideController } from "../controllers";

const router = Router();

router.route("/rides").get(rideController.list).post(rideController.bulkCreate);

router.route("/ride").post(rideController.create);

router.route("/ride/:id").get(rideController.show).put(rideController.update).delete(rideController.delete);

export default router;
