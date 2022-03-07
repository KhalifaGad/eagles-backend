import { Router } from "express";
import { productController } from "../controllers";

const router = Router();

router.route("/products").get(productController.list);

router.route("/product").post(productController.create);

export default router;
