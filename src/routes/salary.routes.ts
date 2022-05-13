import { Router } from "express";
import { salaryController } from "../controllers";
import { validateMiddleware } from "../middlewares";
import { salarySchema } from "../validations";

const router = Router();

router
  .route("/salaries")
  .get(salaryController.list)
  .post(validateMiddleware(salarySchema), salaryController.bulkCreate);

router.route("/salary").post(validateMiddleware(salarySchema), salaryController.create);

router
  .route("/salary/:id")
  .get(salaryController.show)
  .put(validateMiddleware(salarySchema), salaryController.update)
  .delete(salaryController.delete);

export default router;
