import { employeeRatingRepository } from "$infra";
import { EmployeeRatingInterface } from "$types";
import DefaultService from "./default.service.js";

class EmployeeRatingService extends DefaultService<EmployeeRatingInterface> {
  constructor() {
    super(employeeRatingRepository);
  }
}

export default new EmployeeRatingService();
