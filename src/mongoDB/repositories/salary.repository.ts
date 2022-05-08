import { FilterQuery } from "mongoose";
import DefaultRepository from "./default.repository";
import { SalaryModel } from "../models";
import { SalaryInterface } from "../../types";

class SalaryRepository extends DefaultRepository<SalaryInterface> {
  constructor() {
    super(SalaryModel);
  }

  findById = async (id: string): Promise<SalaryInterface> => {
    return SalaryModel.findById(id).populate("employee").populate("agency").lean();
  };

  findOne = async (filter: FilterQuery<SalaryInterface> = {}): Promise<SalaryInterface> => {
    return SalaryModel.findOne(filter).populate("employee").populate("agency").lean();
  };

  list = async (filter: FilterQuery<SalaryInterface> = {}): Promise<SalaryInterface[]> => {
    return SalaryModel.find(filter).populate("employee").populate("agency").lean();
  };
}

export default new SalaryRepository();
