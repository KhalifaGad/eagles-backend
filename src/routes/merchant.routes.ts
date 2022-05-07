import { Router } from "express";
import { merchantController } from "../controllers";

const router = Router();

router.route("/merchants").get(merchantController.list);

router.route("/merchant").post(merchantController.create);

router.route("/merchant/:id").get(merchantController.show).put(merchantController.update);

export default router;
