import { Router } from "express";
import { authenticationController } from "../controllers";
import { authenticateMiddleware } from "../middlewares";

const router = Router();

router.route("/login").post(authenticationController.login);

router.use(authenticateMiddleware);

router.route("/credentials").get(authenticationController.list).post(authenticationController.bulkCreate);

router.route("/credential").post(authenticationController.create);

router
  .route("/credential/:id")
  .get(authenticationController.show)
  .put(authenticationController.update)
  .delete(authenticationController.delete);

export default router;
