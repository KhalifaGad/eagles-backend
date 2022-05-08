import { Router } from "express";
import { employeeController } from "../controllers";

const router = Router();

router.route("/employees").get(employeeController.list).post(employeeController.bulkCreate);

router.route("/employee").post(employeeController.create);

router
  .route("/employee/:id")
  .get(employeeController.show)
  .put(employeeController.update)
  .delete(employeeController.delete);

export default router;
