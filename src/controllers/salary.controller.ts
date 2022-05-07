import DefaultController from "./default.controller";
import { salaryService } from "../services";
import { SalaryInterface } from "../types";

class SalaryController extends DefaultController<SalaryInterface> {
  constructor() {
    super(salaryService);
  }
}

export default new SalaryController();
