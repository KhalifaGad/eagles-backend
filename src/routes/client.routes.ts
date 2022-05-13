import { Router } from "express";
import { clientController } from "../controllers";
import { validateMiddleware } from "../middlewares";
import { clientSchema } from "../validations";

const router = Router();

router.route("/clients").get(clientController.list).post(validateMiddleware(clientSchema), clientController.bulkCreate);

router.route("/client").post(validateMiddleware(clientSchema), clientController.create);

router
  .route("/client/:id")
  .get(clientController.show)
  .put(validateMiddleware(clientSchema), clientController.update)
  .delete(clientController.delete);

export default router;
