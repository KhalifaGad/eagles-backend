import { Router } from "express";
import { authenticationController } from "../controllers";
import { authenticateMiddleware, validateMiddleware } from "../middlewares";
import { credentialSchema, credentialLoginSchema } from "../validations";

const router = Router();

router.route("/login").post(validateMiddleware(credentialLoginSchema), authenticationController.login);

router.use(authenticateMiddleware);

router
  .route("/credentials")
  .get(authenticationController.list)
  .post(validateMiddleware(credentialSchema), authenticationController.bulkCreate);

router.route("/credential").post(validateMiddleware(credentialSchema), authenticationController.create);

router
  .route("/credential/:id")
  .get(authenticationController.show)
  .put(validateMiddleware(credentialSchema), authenticationController.update)
  .delete(authenticationController.delete);

export default router;
