import { Router } from "express";
import Controller from "../controllers/city.controller";

const router = new Router();

router.route("/").get(Controller.list);

export default router;
