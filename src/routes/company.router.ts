import { Router } from "express";
import { organizationController } from "../controllers";

const router = Router();

router.route("/companies").get(organizationController.list);

router.route("/organization").post(organizationController.create);

export default router;
