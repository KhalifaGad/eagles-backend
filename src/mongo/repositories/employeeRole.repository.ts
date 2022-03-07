import Repository from "./baseRepository";
import { employeeRoleModel, EmployeeRoleDocument } from "../schemas";

class EmployeeRoleRepository extends Repository<EmployeeRoleDocument> {
  constructor() {
    super(employeeRoleModel);
  }
}

export default new EmployeeRoleRepository();
