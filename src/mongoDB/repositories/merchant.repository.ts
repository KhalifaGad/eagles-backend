import { FilterQuery } from "mongoose";
import DefaultRepository from "./default.repository";
import { MerchantModel } from "../models";
import { MerchantInterface } from "../../types";

class MerchantRepository extends DefaultRepository<MerchantInterface> {
  constructor() {
    super(MerchantModel);
  }

  findById = async (id: string): Promise<MerchantInterface> => {
    return MerchantModel.findById(id)
      .populate([{ path: "company", populate: { path: "address.city" } }, { path: "address.city" }])
      .lean();
  };

  findOne = async (filter: FilterQuery<MerchantInterface> = {}): Promise<MerchantInterface> => {
    return MerchantModel.findOne(filter)
      .populate([{ path: "company", populate: { path: "address.city" } }, { path: "address.city" }])
      .lean();
  };

  list = async (filter: FilterQuery<MerchantInterface> = {}): Promise<MerchantInterface[]> => {
    return MerchantModel.find(filter)
      .populate([{ path: "company", populate: { path: "address.city" } }, { path: "address.city" }])
      .lean();
  };
}

export default new MerchantRepository();
