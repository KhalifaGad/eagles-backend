import { Router } from "express";
import { salaryController } from "../controllers";

const router = Router();

router.route("/salaries").get(salaryController.list);

router.route("/salary").post(salaryController.create);

router.route("/salary/:id").get(salaryController.show).put(salaryController.update);

export default router;
