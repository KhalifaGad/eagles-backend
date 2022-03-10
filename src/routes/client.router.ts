import { Router } from "express";
import { userController } from "../controllers";

const router = Router();

router.route("/users").get(userController.list);

router.route("/user").post(userController.create);

export default router;
