import { Router } from "express";
import { rideTemplateController } from "../controllers";
import { validateMiddleware } from "../middlewares";
import { rideTemplateSchema } from "../validations";

const router = Router();

router.route("/ride-templates").get(rideTemplateController.list).post(validateMiddleware(rideTemplateSchema), rideTemplateController.create);

router
	.route("/ride-templates/:id")
	.get(rideTemplateController.show)
	.put(validateMiddleware(rideTemplateSchema), rideTemplateController.update)
	.delete(rideTemplateController.delete);

export default router;
