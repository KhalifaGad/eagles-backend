import { Router } from "express";
import { companyController } from "../controllers";
import { validateMiddleware } from "../middlewares";
import { companySchema } from "../validations";

const router = Router();

router
  .route("/companies")
  .get(companyController.list)
  .post(validateMiddleware(companySchema), companyController.create);

router
  .route("/companies/:id")
  .get(companyController.show)
  .put(validateMiddleware(companySchema), companyController.update)
  .delete(companyController.delete);

export default router;
