import { Router } from "express";
import { credentialController } from "../controllers";

const router = Router();

router.route("/credentials").get(credentialController.list);

router.route("/credential").post(credentialController.create);

router.route("/credential/:id").get(credentialController.show).put(credentialController.update);

export default router;
