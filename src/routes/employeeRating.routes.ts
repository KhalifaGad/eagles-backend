import { Router } from "express";
import { employeeRatingController } from "../controllers";
import { validateMiddleware } from "../middlewares";
import { employeeRatingSchema } from "../validations";

const router = Router();

router
  .route("/employees-rating")
  .get(employeeRatingController.list)
  .post(validateMiddleware(employeeRatingSchema), employeeRatingController.bulkCreate);

router.route("/employee-rating").post(validateMiddleware(employeeRatingSchema), employeeRatingController.create);

router
  .route("/employee-rating/:id")
  .get(employeeRatingController.show)
  .put(validateMiddleware(employeeRatingSchema), employeeRatingController.update)
  .delete(employeeRatingController.delete);

export default router;
