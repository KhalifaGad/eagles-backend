import { salaryService } from "$services";
import { SalaryInterface } from "$types";
import DefaultController from "./default.controller.js";

class SalaryController extends DefaultController<SalaryInterface> {
  constructor() {
    super(salaryService);
  }
}

export default new SalaryController();
