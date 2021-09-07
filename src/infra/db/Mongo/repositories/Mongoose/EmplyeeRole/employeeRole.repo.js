import BaseRepo from "../baseRepo";
import Model from "./employeeRole.model";

class EmployeeRoleRepo extends BaseRepo {
  constructor() {
    super(Model);
  }
}

export default new EmployeeRoleRepo();
