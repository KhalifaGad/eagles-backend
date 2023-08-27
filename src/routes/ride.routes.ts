import { Router } from "express";
import { rideController } from "../controllers";
import { validateMiddleware } from "../middlewares";
import { createRideSchema, rideSchema } from "../validations";

const router = Router();

router.route("/rides").get(rideController.list).post(validateMiddleware(createRideSchema), rideController.create);

router
  .route("/rides/:id")
  .get(rideController.show)
  .put(validateMiddleware(rideSchema), rideController.update)
  .delete(rideController.delete);

export default router;
