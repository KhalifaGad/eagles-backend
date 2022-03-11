import { Router } from "express";
import { citiesController } from "../controllers";

const router = Router();

router.route("/cities").get(citiesController.list);

router.route("/city").post(citiesController.create);

export default router;
