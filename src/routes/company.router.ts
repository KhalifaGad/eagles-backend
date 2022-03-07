import { Router } from "express";
import { companyController } from "../controllers";

const router = Router();

router.route("/companies").get(companyController.list);

router.route("/company").post(companyController.create);

export default router;
