import { Router } from "express";
import { deliveryReceiptController } from "../controllers";
import { validateMiddleware } from "../middlewares";
import { deliveryReceiptSchema } from "../validations";

const router = Router();

router.route("/delivery-receipts")
      .get(deliveryReceiptController.list)
      .post(validateMiddleware(deliveryReceiptSchema), deliveryReceiptController.create);


router
	.route("/delivery-receipts/:id")
	.get(deliveryReceiptController.show)
	.put(validateMiddleware(deliveryReceiptSchema), deliveryReceiptController.update)
	.delete(deliveryReceiptController.delete);


router
	.route("/delivery-receipts/:id/confirmation")
	.post(deliveryReceiptController.update);

export default router;
