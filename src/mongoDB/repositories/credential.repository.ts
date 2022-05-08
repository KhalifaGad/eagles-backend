import { FilterQuery } from "mongoose";
import DefaultRepository from "./default.repository";
import { CredentialModel } from "../models";
import { CredentialInterface } from "../../types";

class CredentialRepository extends DefaultRepository<CredentialInterface> {
  constructor() {
    super(CredentialModel);
  }

  findById = async (id: string): Promise<CredentialInterface> => {
    return CredentialModel.findById(id).populate("account").lean();
  };

  findOne = async (filter: FilterQuery<CredentialInterface> = {}): Promise<CredentialInterface> => {
    return CredentialModel.findOne(filter).populate("account").lean();
  };

  list = async (filter: FilterQuery<CredentialInterface> = {}): Promise<CredentialInterface[]> => {
    return CredentialModel.find(filter).populate("account").lean();
  };
}

export default new CredentialRepository();
