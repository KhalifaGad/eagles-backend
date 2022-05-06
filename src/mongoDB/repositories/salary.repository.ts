import Repository from "./baseRepository";
import { SalaryModel } from "../models";
import { SalaryInterface } from "../../types";

class SalaryRepository extends Repository<SalaryInterface> {
  constructor() {
    super(SalaryModel);
  }
}

export default new SalaryRepository();
