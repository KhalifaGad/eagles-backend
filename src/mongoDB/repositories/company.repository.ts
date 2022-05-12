import DefaultRepository from "./default.repository";
import { CompanyModel } from "../models";
import { CompanyInterface } from "../../types";

class CompanyRepository extends DefaultRepository<CompanyInterface> {
  constructor() {
    super(CompanyModel, { path: "address.city" });
  }
}

export default new CompanyRepository();
