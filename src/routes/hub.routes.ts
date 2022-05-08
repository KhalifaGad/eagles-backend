import { Router } from "express";
import { hubController } from "../controllers";

const router = Router();

router.route("/hubs").get(hubController.list).post(hubController.bulkCreate);

router.route("/hub").post(hubController.create);

router.route("/hub/:id").get(hubController.show).put(hubController.update).delete(hubController.delete);

export default router;
