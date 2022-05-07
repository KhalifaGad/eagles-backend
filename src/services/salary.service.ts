import { salaryRepository } from "../mongoDB/repositories";
import DefaultService from "./default.service";
import { SalaryInterface } from "../types";

class SalaryService extends DefaultService<SalaryInterface> {
  constructor() {
    super(salaryRepository);
  }
}

export default new SalaryService();
