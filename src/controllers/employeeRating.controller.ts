import DefaultController from "./default.controller";
import { employeeRatingService } from "../services";
import { EmployeeRatingInterface } from "../types";

class EmployeeRatingController extends DefaultController<EmployeeRatingInterface> {
  constructor() {
    super(employeeRatingService);
  }
}

export default new EmployeeRatingController();
