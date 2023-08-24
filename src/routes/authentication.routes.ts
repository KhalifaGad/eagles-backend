import { Router } from "express";
import { authenticationController } from "../controllers";
import { authenticateMiddleware, validateMiddleware } from "../middlewares";
import { credentialSchema, credentialLoginSchema, updateCredentialSchema } from "../validations";

const router = Router();

router.route("/authentications").post(validateMiddleware(credentialLoginSchema), authenticationController.login);

router.use(authenticateMiddleware);

router
  .route("/credentials")
  .get(authenticationController.list)
  .post(validateMiddleware(credentialSchema), authenticationController.bulkCreate);

router.route("/credentials").post(validateMiddleware(credentialSchema), authenticationController.create);

router
  .route("/credentials/:id")
  .get(authenticationController.show)
  .put(validateMiddleware(updateCredentialSchema), authenticationController.update)
  .delete(authenticationController.delete);

export default router;
