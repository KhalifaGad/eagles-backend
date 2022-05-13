import { Router } from "express";
import { shipmentController } from "../controllers";
import { validateMiddleware } from "../middlewares";
import { shipmentSchema } from "../validations";

const router = Router();

router
  .route("/shipments")
  .get(shipmentController.list)
  .post(validateMiddleware(shipmentSchema), shipmentController.bulkCreate);

router.route("/shipment").post(validateMiddleware(shipmentSchema), shipmentController.create);

router
  .route("/shipment/:id")
  .get(shipmentController.show)
  .put(validateMiddleware(shipmentSchema), shipmentController.update)
  .delete(shipmentController.delete);

export default router;
