import { Router } from "express";
import { employeeRatingController } from "../controllers";

const router = Router();

router.route("/employees-rating").get(employeeRatingController.list);

router.route("/employee-rating").post(employeeRatingController.create);

router.route("/employee-rating/:id").get(employeeRatingController.show).put(employeeRatingController.update);

export default router;
