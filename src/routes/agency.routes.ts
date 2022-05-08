import { Router } from "express";
import { agencyController } from "../controllers";

const router = Router();

router.route("/agencies").get(agencyController.list).post(agencyController.bulkCreate);

router.route("/agency").post(agencyController.create);

router.route("/agency/:id").get(agencyController.show).put(agencyController.update).delete(agencyController.delete);

export default router;
