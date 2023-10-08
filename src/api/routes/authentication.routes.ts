import { Router } from "express";
import { authenticationController } from "../controllers/index.js";
import { authenticateMiddleware, validateMiddleware } from "../middlewares/index.js";
import { credentialLoginSchema, credentialSchema, updateCredentialSchema } from "../validations/index.js";

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
