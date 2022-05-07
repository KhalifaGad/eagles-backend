import DefaultController from "./default.controller";
import { companyService } from "../services";
import { CompanyInterface } from "../types";

class CompanyController extends DefaultController<CompanyInterface> {
  constructor() {
    super(companyService);
  }
}

export default new CompanyController();
