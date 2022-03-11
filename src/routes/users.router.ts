import { Router } from "express";
import { usersController } from "../controllers";

const router = Router();

router.route("/users").get(usersController.list);

router.route("/user").post(usersController.create);

export default router;
