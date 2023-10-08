import { Router } from "express";
import { vehicleController } from "../controllers/index.js";
import { validateMiddleware } from "../middlewares/index.js";
import { vehicleSchema } from "../validations/index.js";

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
