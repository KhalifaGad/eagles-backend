import { companyRepository } from "../mongoDB/repositories";
import DefaultService from "./default.service";
import { CompanyInterface } from "../types";

class CompanyService extends DefaultService<CompanyInterface> {
  constructor() {
    super(companyRepository);
  }
}

export default new CompanyService();
