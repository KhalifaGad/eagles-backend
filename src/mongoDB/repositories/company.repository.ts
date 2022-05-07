import DefaultRepository from "./default.repository";
import { CompanyModel } from "../models";
import { CompanyInterface } from "../../types";

class CompanyRepository extends DefaultRepository<CompanyInterface> {
  constructor() {
    super(CompanyModel);
  }
}

export default new CompanyRepository();
