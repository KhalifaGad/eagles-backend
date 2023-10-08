import { employeeService } from "$services";
import { EmployeeInterface } from "$types";
import DefaultController from "./default.controller.js";

class EmployeeController extends DefaultController<EmployeeInterface> {
  constructor() {
    super(employeeService);
  }
}

export default new EmployeeController();
