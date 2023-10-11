import { Router } from "express";
import { clientController } from "../controllers/index.js";
import { validateMiddleware } from "../middlewares/index.js";
import { clientSchema } from "../validations/index.js";

const router = Router();

router.route("/clients").get(clientController.list).post(validateMiddleware(clientSchema), clientController.create);

router
  .route("/clients/:id")
  .get(clientController.show)
  .put(validateMiddleware(clientSchema), clientController.update)
  .delete(clientController.delete);

export default router;
