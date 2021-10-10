import { Router } from "express";
import { Authware } from "../middlewares";
import Controller from "../controllers/company.controller";

const router = new Router();

router
  .route("/")
  .post(Authware.withBranchId, Controller.add)
  .get(Controller.list);

export default router;
