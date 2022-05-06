import Repository from "./baseRepository";
import { EmployeeModel } from "../models";
import { EmployeeInterface } from "../../types";

class EmployeeRepository extends Repository<EmployeeInterface> {
  constructor() {
    super(EmployeeModel);
  }
}

export default new EmployeeRepository();
