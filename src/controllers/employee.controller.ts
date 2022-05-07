import DefaultController from "./default.controller";
import { employeeService } from "../services";
import { EmployeeInterface } from "../types";

class EmployeeController extends DefaultController<EmployeeInterface> {
  constructor() {
    super(employeeService);
  }
}

export default new EmployeeController();
