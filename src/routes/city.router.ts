import { Router } from "express";
import { cityController } from "../controllers";

const router = Router();

router.route("/cities").get(cityController.list);

export default router;
