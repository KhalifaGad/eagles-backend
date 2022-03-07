import { Router } from "express";
import { packController } from "../controllers";

const router = Router();

router.route("/pack").post(packController.create);

export default router;
