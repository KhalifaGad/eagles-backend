import { Router } from "express";
import { shipmentController } from "../controllers";
import { validateMiddleware } from "../middlewares";
import { shipmentSchema, createShipmentSchema } from "../validations";

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
