import Repository from "./baseRepository";
import { CompanyModel } from "../models";
import { CompanyInterface } from "../../types";

class CompanyRepository extends Repository<CompanyInterface> {
  constructor() {
    super(CompanyModel);
  }
}

export default new CompanyRepository();
