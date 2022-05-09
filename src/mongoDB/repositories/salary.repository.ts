import { FilterQuery } from "mongoose";
import DefaultRepository from "./default.repository";
import { SalaryModel } from "../models";
import { SalaryInterface } from "../../types";

class SalaryRepository extends DefaultRepository<SalaryInterface> {
  constructor() {
    super(SalaryModel);
  }

  findById = async (id: string): Promise<SalaryInterface> => {
    return SalaryModel.findById(id)
      .populate([
        { path: "employee", populate: { path: "address.city" } },
        { path: "agency", populate: { path: "address.city" } },
      ])
      .lean();
  };

  findOne = async (filter: FilterQuery<SalaryInterface> = {}): Promise<SalaryInterface> => {
    return SalaryModel.findOne(filter)
      .populate([
        { path: "employee", populate: { path: "address.city" } },
        { path: "agency", populate: { path: "address.city" } },
      ])
      .lean();
  };

  list = async (filter: FilterQuery<SalaryInterface> = {}): Promise<SalaryInterface[]> => {
    return SalaryModel.find(filter)
      .populate([
        { path: "employee", populate: { path: "address.city" } },
        { path: "agency", populate: { path: "address.city" } },
      ])
      .lean();
  };
}

export default new SalaryRepository();
