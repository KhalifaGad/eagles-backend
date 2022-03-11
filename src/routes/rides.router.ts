import { Router } from "express";
import { ridesController } from "../controllers";

const router = Router();

router.route("/rides").get(ridesController.list);

router.route("/ride").post(ridesController.create);

export default router;
