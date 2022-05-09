import { FilterQuery } from "mongoose";
import DefaultRepository from "./default.repository";
import { ClientModel } from "../models";
import { ClientInterface } from "../../types";

class ClientRepository extends DefaultRepository<ClientInterface> {
  constructor() {
    super(ClientModel);
  }

  findById = async (id: string): Promise<ClientInterface> => {
    return ClientModel.findById(id).populate({ path: "address.city" }).lean();
  };

  findOne = async (filter: FilterQuery<ClientInterface> = {}): Promise<ClientInterface> => {
    return ClientModel.findOne(filter).populate({ path: "address.city" }).lean();
  };

  list = async (filter: FilterQuery<ClientInterface> = {}): Promise<ClientInterface[]> => {
    return ClientModel.find(filter).populate({ path: "address.city" }).lean();
  };
}

export default new ClientRepository();
