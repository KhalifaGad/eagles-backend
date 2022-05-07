import { Router } from "express";
import { shipmentController } from "../controllers";

const router = Router();

router.route("/shipments").get(shipmentController.list);

router.route("/shipment").post(shipmentController.create);

router.route("/shipment/:id").get(shipmentController.show).put(shipmentController.update);

export default router;
