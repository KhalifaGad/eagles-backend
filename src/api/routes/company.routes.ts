import { Router } from "express";
import { companyController } from "../controllers/index.js";
import { validateMiddleware } from "../middlewares/index.js";
import { companySchema } from "../validations/index.js";

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
