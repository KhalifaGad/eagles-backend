import DefaultRepository from "./default.repository";
import { EmployeeModel } from "../models";
import { EmployeeInterface } from "../../types";

class EmployeeRepository extends DefaultRepository<EmployeeInterface> {
  constructor() {
    super(EmployeeModel, [{ path: "address.city" }, { path: "hub" }, { path: "agency" }]);
  }
}

export default new EmployeeRepository();
