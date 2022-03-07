import Repository from "./baseRepository";
import { employeeModel, EmployeeDocument } from "../schemas";

class EmployeeRepository extends Repository<EmployeeDocument> {
  constructor() {
    super(employeeModel);
  }
}

export default new EmployeeRepository();
