import { Router } from "express";
import { shipmentController } from "../controllers";

const router = Router();

router.route("/shipments").get(shipmentController.list).post(shipmentController.bulkCreate);

router.route("/shipment").post(shipmentController.create);

router
  .route("/shipment/:id")
  .get(shipmentController.show)
  .put(shipmentController.update)
  .delete(shipmentController.delete);

export default router;
