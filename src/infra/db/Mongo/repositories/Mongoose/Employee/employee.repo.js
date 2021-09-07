import BaseRepo from "../baseRepo";
import Model from "./employee.model";

class EmployeeRepo extends BaseRepo {
  constructor() {
    super(Model);
  }
}

export default new EmployeeRepo();
