import { Router } from "express";
import { employeeController } from "../controllers";
import { validateMiddleware } from "../middlewares";
import { employeeSchema } from "../validations";

const router = Router();

router
  .route("/employees")
  .get(employeeController.list)
  .post(validateMiddleware(employeeSchema), employeeController.create);

router
  .route("/employees/:id")
  .get(employeeController.show)
  .put(validateMiddleware(employeeSchema), employeeController.update)
  .delete(employeeController.delete);

export default router;
