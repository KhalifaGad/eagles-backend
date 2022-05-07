import DefaultRepository from "./default.repository";
import { SalaryModel } from "../models";
import { SalaryInterface } from "../../types";

class SalaryRepository extends DefaultRepository<SalaryInterface> {
  constructor() {
    super(SalaryModel);
  }
}

export default new SalaryRepository();
