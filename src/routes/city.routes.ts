import { Router } from "express";
import { cityController } from "../controllers";
import { validateMiddleware } from "../middlewares";
import { citySchema } from "../validations";

const router = Router();

router.route("/cities").get(cityController.list).post(validateMiddleware(citySchema), cityController.bulkCreate);

router.route("/city").post(validateMiddleware(citySchema), cityController.create);

router
  .route("/city/:id")
  .get(cityController.show)
  .put(validateMiddleware(citySchema), cityController.update)
  .delete(cityController.delete);

export default router;
