import DefaultRepository from "./default.repository";
import { SalaryModel } from "../models";
import { SalaryInterface } from "../../types";

class SalaryRepository extends DefaultRepository<SalaryInterface> {
  constructor() {
    super(SalaryModel, [
      { path: "employee", populate: { path: "address.city" } },
      { path: "agency", populate: { path: "address.city" } },
    ]);
  }
}

export default new SalaryRepository();
