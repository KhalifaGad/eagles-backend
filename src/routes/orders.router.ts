import { Router } from "express";
import { ordersController } from "../controllers";

const router = Router();

router.route("/order").get(ordersController.list);

router.route("/order").post(ordersController.create);

export default router;
