import { Router } from "express";
import { vehicleController } from "../controllers";
import { validateMiddleware } from "../middlewares";
import { vehicleSchema } from "../validations";

const router = Router();

router
  .route("/vehicles")
  .get(vehicleController.list)
  .post(validateMiddleware(vehicleSchema), vehicleController.bulkCreate);

router.route("/vehicle").post(validateMiddleware(vehicleSchema), vehicleController.create);

router
  .route("/vehicle/:id")
  .get(vehicleController.show)
  .put(validateMiddleware(vehicleSchema), vehicleController.update)
  .delete(vehicleController.delete);

export default router;
