import { Router } from "express";
import { employeeController } from "../controllers/index.js";
import { validateMiddleware } from "../middlewares/index.js";
import { employeeSchema } from "../validations/index.js";

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
