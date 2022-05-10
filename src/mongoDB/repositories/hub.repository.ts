import { FilterQuery } from "mongoose";
import DefaultRepository from "./default.repository";
import { HubModel } from "../models";
import { HubInterface, MongooseID } from "../../types";

class HubRepository extends DefaultRepository<HubInterface> {
  constructor() {
    super(HubModel);
  }

  findById = async (id: MongooseID): Promise<HubInterface> => {
    return HubModel.findById(id).populate({ path: "address.city" }).lean();
  };

  findOne = async (filter: FilterQuery<HubInterface> = {}): Promise<HubInterface> => {
    return HubModel.findOne(filter).populate({ path: "address.city" }).lean();
  };

  list = async (filter: FilterQuery<HubInterface> = {}): Promise<HubInterface[]> => {
    return HubModel.find(filter).populate({ path: "address.city" }).lean();
  };
}

export default new HubRepository();
