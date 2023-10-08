import { employeeRatingService } from "$services";
import { EmployeeRatingInterface } from "$types";
import DefaultController from "./default.controller.js";

class EmployeeRatingController extends DefaultController<EmployeeRatingInterface> {
  constructor() {
    super(employeeRatingService);
  }
}

export default new EmployeeRatingController();
