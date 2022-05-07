import { Router } from "express";
import { companyController } from "../controllers";

const router = Router();

router.route("/companies").get(companyController.list);

router.route("/company").post(companyController.create);

router.route("/company/:id").get(companyController.show).put(companyController.update);

export default router;
