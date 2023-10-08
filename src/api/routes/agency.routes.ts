import { Router } from "express";
import { agencyController } from "../controllers/index.js";
import { validateMiddleware } from "../middlewares/index.js";
import { agencySchema } from "../validations/index.js";

const router = Router();

router
  .route("/agencies")
  .get(agencyController.list)
  .post(validateMiddleware(agencySchema), agencyController.bulkCreate);

router.route("/agency").post(validateMiddleware(agencySchema), agencyController.create);

router
  .route("/agency/:id")
  .get(agencyController.show)
  .put(validateMiddleware(agencySchema), agencyController.update)
  .delete(agencyController.delete);

export default router;
