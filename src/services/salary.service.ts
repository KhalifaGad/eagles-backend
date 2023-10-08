import { salaryRepository } from "$infra";
import { SalaryInterface } from "$types";
import DefaultService from "./default.service.js";

class SalaryService extends DefaultService<SalaryInterface> {
  constructor() {
    super(salaryRepository);
  }
}

export default new SalaryService();
