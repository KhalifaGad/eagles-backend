import DefaultRepository from "./default.repository.js";
import { SalaryModel } from "../models/index.js";
import { SalaryInterface } from "$types";

class SalaryRepository extends DefaultRepository<SalaryInterface> {
  constructor() {
    super(SalaryModel, [
      { path: "employee", populate: { path: "address.city" } },
      { path: "agency", populate: { path: "address.city" } },
    ]);
  }
}

export default new SalaryRepository();
