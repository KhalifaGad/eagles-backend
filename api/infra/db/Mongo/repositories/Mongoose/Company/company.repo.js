import BaseRepo from "../baseRepo";
import Model from "./company.model";

class CompanyRepo extends BaseRepo {
  constructor() {
    super(Model);
  }
}

export default new CompanyRepo();
