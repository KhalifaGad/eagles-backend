import DefaultRepository from "./default.repository.js";
import { CompanyModel } from "../models/index.js";
import { CompanyInterface } from "$types";

class CompanyRepository extends DefaultRepository<CompanyInterface> {
  constructor() {
    super(CompanyModel, { path: "address.city" });
  }
}

export default new CompanyRepository();
