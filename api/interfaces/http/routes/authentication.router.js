import { Router } from "express";
import AuthController from "../controllers/auth.controller";

const router = new Router();

router.route("/").post(AuthController.login);

export default router;
