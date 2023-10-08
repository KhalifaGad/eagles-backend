import DefaultRepository from "./default.repository.js";
import { EmployeeModel } from "../models/index.js";
import { EmployeeInterface } from "$types";

class EmployeeRepository extends DefaultRepository<EmployeeInterface> {
  constructor() {
    super(EmployeeModel, [{ path: "address.city" }, { path: "hub" }, { path: "agency" }]);
  }
}

export default new EmployeeRepository();
