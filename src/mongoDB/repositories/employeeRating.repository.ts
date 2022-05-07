import DefaultRepository from "./default.repository";
import { EmployeeRatingModel } from "../models";
import { EmployeeRatingInterface } from "../../types";

class EmployeeRatingRepository extends DefaultRepository<EmployeeRatingInterface> {
  constructor() {
    super(EmployeeRatingModel);
  }
}

export default new EmployeeRatingRepository();
