import { companyService } from "$services";
import { CompanyInterface } from "$types";
import DefaultController from "./default.controller.js";

class CompanyController extends DefaultController<CompanyInterface> {
  constructor() {
    super(companyService);
  }
}

export default new CompanyController();
