import BaseRepo from "../baseRepo";
import Model from "./companyManager.model";

class CompanyManagerRepo extends BaseRepo {
  constructor() {
    super(Model);
  }
}

export default new CompanyManagerRepo();
