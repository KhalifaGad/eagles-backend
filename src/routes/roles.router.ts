import { Router } from "express";
import { rolesController } from "../controllers";

const router = Router();

router.route("/roles").get(rolesController.list);

router.route("/role").post(rolesController.create);

export default router;
