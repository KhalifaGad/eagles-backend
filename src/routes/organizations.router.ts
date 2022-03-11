import { Router } from "express";
import { organizationsController } from "../controllers";

const router = Router();

router.route("/organizations").get(organizationsController.list);

router
  .route("/organization")
  .get(organizationsController.show)
  .post(organizationsController.create);

router
  .route("/organization/:organizationId/branch")
  .post(organizationsController.addBranch);

export default router;
