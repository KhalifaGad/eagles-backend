import { Router } from "express";
import { shipmentController } from "../controllers/index.js";
import { validateMiddleware } from "../middlewares/index.js";
import { createShipmentSchema, shipmentSchema } from "../validations/index.js";

const router = Router();

router
  .route("/shipments")
  .get(shipmentController.list)
  .post(validateMiddleware(createShipmentSchema), shipmentController.create);

router
  .route("/shipments/:id")
  .get(shipmentController.show)
  .put(validateMiddleware(shipmentSchema), shipmentController.update)
  .delete(shipmentController.delete);

export default router;
