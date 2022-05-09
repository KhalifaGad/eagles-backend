import { FilterQuery } from "mongoose";
import DefaultRepository from "./default.repository";
import { AgencyModel } from "../models";
import { AgencyInterface } from "../../types";

class AgencyRepository extends DefaultRepository<AgencyInterface> {
  constructor() {
    super(AgencyModel);
  }

  findById = async (id: string): Promise<AgencyInterface> => {
    return AgencyModel.findById(id).populate({ path: "address.city" }).lean();
  };

  findOne = async (filter: FilterQuery<AgencyInterface> = {}): Promise<AgencyInterface> => {
    return AgencyModel.findOne(filter).populate({ path: "address.city" }).lean();
  };

  list = async (filter: FilterQuery<AgencyInterface> = {}): Promise<AgencyInterface[]> => {
    return AgencyModel.find(filter).populate({ path: "address.city" }).lean();
  };
}

export default new AgencyRepository();
