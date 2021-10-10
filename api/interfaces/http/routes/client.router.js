import { Router } from "express";
import { Authware } from "../middlewares";
import ClientController from "../controllers/client.controller";

const router = new Router();

router.route("/").post(Authware.withBranchId, ClientController.add);

export default router;
