import { FilterQuery } from "mongoose";
import DefaultRepository from "./default.repository";
import { CredentialModel } from "../models";
import { CredentialInterface, MongooseID } from "../../types";

class CredentialRepository extends DefaultRepository<CredentialInterface> {
  constructor() {
    super(CredentialModel);
  }

  findById = async (id: MongooseID): Promise<CredentialInterface> => {
    return CredentialModel.findById(id)
      .populate({ path: "account", populate: { path: "address.city" } })
      .lean();
  };

  findOne = async (filter: FilterQuery<CredentialInterface> = {}): Promise<CredentialInterface> => {
    return CredentialModel.findOne(filter)
      .populate({ path: "account", populate: { path: "address.city" } })
      .lean();
  };

  list = async (filter: FilterQuery<CredentialInterface> = {}): Promise<CredentialInterface[]> => {
    return CredentialModel.find(filter)
      .populate({ path: "account", populate: { path: "address.city" } })
      .lean();
  };
}

export default new CredentialRepository();
