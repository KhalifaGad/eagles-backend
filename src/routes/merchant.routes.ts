import { Router } from "express";
import { merchantController } from "../controllers";
import { validateMiddleware } from "../middlewares";
import { merchantSchema } from "../validations";

const router = Router();

router
  .route("/merchants")
  .get(merchantController.list)
  .post(validateMiddleware(merchantSchema), merchantController.bulkCreate);

router.route("/merchant").post(validateMiddleware(merchantSchema), merchantController.create);

router
  .route("/merchant/:id")
  .get(merchantController.show)
  .put(validateMiddleware(merchantSchema), merchantController.update)
  .delete(merchantController.delete);

export default router;
