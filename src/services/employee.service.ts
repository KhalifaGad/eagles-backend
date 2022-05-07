import { employeeRepository } from "../mongoDB/repositories";
import DefaultService from "./default.service";
import { EmployeeInterface } from "../types";

class EmployeeService extends DefaultService<EmployeeInterface> {
  constructor() {
    super(employeeRepository);
  }
}

export default new EmployeeService();
