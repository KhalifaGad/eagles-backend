import { Router } from "express";
import { Authware } from "../middlewares";
import Controller from "../controllers/pack.controller";

const router = new Router();

router.route("/").post(Authware.withBranchId, Controller.add);

export default router;
