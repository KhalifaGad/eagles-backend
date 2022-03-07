import { Router } from "express";
import { clientController } from "../controllers";

const router = Router();

router.route("/clients").get(clientController.list);

router.route("/client").post(clientController.create);

export default router;
