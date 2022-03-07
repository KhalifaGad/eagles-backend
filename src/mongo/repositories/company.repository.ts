import Repository from "./baseRepository";
import { companyModel, CompanyDocument } from "../schemas";

class CompanyRepository extends Repository<CompanyDocument> {
  constructor() {
    super(companyModel);
  }
}

export default new CompanyRepository();
