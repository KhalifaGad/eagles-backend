import { employeeRatingRepository } from "../mongoDB/repositories";
import DefaultService from "./default.service";
import { EmployeeRatingInterface } from "../types";

class EmployeeRatingService extends DefaultService<EmployeeRatingInterface> {
  constructor() {
    super(employeeRatingRepository);
  }
}

export default new EmployeeRatingService();
