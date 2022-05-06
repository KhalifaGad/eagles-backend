import Repository from "./baseRepository";
import { EmployeeRatingModel } from "../models";
import { EmployeeRatingInterface } from "../../types";

class EmployeeRatingRepository extends Repository<EmployeeRatingInterface> {
  constructor() {
    super(EmployeeRatingModel);
  }
}

export default new EmployeeRatingRepository();
