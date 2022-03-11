import { Router } from "express";
import { productsController } from "../controllers";

const router = Router();

router.route("/products").get(productsController.list);

router.route("/product").post(productsController.create);

export default router;
