import { Router } from "express";
import { cityController } from "../controllers";

const router = Router();

router.route("/cities").get(cityController.list);

router.route("/city").post(cityController.create);

router.route("/city/:id").get(cityController.show).put(cityController.update);

export default router;
