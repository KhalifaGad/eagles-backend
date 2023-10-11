import { Router } from "express";
import { deliveryReceiptController } from "../controllers/index.js";
import { validateMiddleware } from "../middlewares/index.js";
import { deliveryReceiptSchema } from "../validations/index.js";

const router = Router();

router
  .route("/delivery-receipts")
  .get(deliveryReceiptController.list)
  .post(validateMiddleware(deliveryReceiptSchema), deliveryReceiptController.create);

router
  .route("/delivery-receipts/:id")
  .get(deliveryReceiptController.show)
  .put(validateMiddleware(deliveryReceiptSchema), deliveryReceiptController.update)
  .delete(deliveryReceiptController.delete);

router.route("/delivery-receipts/:id/confirmation").post(deliveryReceiptController.update);

export default router;
