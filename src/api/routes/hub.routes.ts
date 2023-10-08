import { Router } from "express";
import { hubController } from "../controllers/index.js";
import { validateMiddleware } from "../middlewares/index.js";
import { hubSchema } from "../validations/index.js";

const router = Router();

router.route("/hubs").get(hubController.list).post(validateMiddleware(hubSchema));

router.route("/hubs").post(validateMiddleware(hubSchema), hubController.create);

router
  .route("/hubs/:id")
  .get(hubController.show)
  .put(validateMiddleware(hubSchema), hubController.update)
  .delete(hubController.delete);

export default router;
