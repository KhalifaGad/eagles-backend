import { FilterQuery } from "mongoose";
import DefaultRepository from "./default.repository";
import { MerchantModel } from "../models";
import { MerchantInterface } from "../../types";

class MerchantRepository extends DefaultRepository<MerchantInterface> {
  constructor() {
    super(MerchantModel);
  }

  findById = async (id: string): Promise<MerchantInterface> => {
    return MerchantModel.findById(id).populate("company").lean();
  };

  findOne = async (filter: FilterQuery<MerchantInterface> = {}): Promise<MerchantInterface> => {
    return MerchantModel.findOne(filter).populate("company").lean();
  };

  list = async (filter: FilterQuery<MerchantInterface> = {}): Promise<MerchantInterface[]> => {
    return MerchantModel.find(filter).populate("company").lean();
  };
}

export default new MerchantRepository();
