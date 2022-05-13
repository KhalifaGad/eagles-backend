import { Router } from "express";
import { rideController } from "../controllers";
import { validateMiddleware } from "../middlewares";
import { rideSchema } from "../validations";

const router = Router();

router.route("/rides").get(rideController.list).post(validateMiddleware(rideSchema), rideController.bulkCreate);

router.route("/ride").post(validateMiddleware(rideSchema), rideController.create);

router
  .route("/ride/:id")
  .get(rideController.show)
  .put(validateMiddleware(rideSchema), rideController.update)
  .delete(rideController.delete);

export default router;
