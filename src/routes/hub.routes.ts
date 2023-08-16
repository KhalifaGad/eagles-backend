import { Router } from "express";
import { hubController } from "../controllers";
import { validateMiddleware } from "../middlewares";
import { hubSchema } from "../validations";

const router = Router();

router.route("/hubs").get(hubController.list).post(validateMiddleware(hubSchema));

router.route("/hubs").post(validateMiddleware(hubSchema), hubController.create);

router
  .route("/hub/:id")
  .get(hubController.show)
  .put(validateMiddleware(hubSchema), hubController.update)
  .delete(hubController.delete);

export default router;
