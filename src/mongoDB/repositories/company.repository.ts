import { FilterQuery } from "mongoose";
import DefaultRepository from "./default.repository";
import { CompanyModel } from "../models";
import { CompanyInterface } from "../../types";

class CompanyRepository extends DefaultRepository<CompanyInterface> {
  constructor() {
    super(CompanyModel);
  }

  findById = async (id: string): Promise<CompanyInterface> => {
    return CompanyModel.findById(id).populate({ path: "address.city" }).lean();
  };

  findOne = async (filter: FilterQuery<CompanyInterface> = {}): Promise<CompanyInterface> => {
    return CompanyModel.findOne(filter).populate({ path: "address.city" }).lean();
  };

  list = async (filter: FilterQuery<CompanyInterface> = {}): Promise<CompanyInterface[]> => {
    return CompanyModel.find(filter).populate({ path: "address.city" }).lean();
  };
}

export default new CompanyRepository();
