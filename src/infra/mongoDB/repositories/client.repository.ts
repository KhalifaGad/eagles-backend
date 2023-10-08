import DefaultRepository from "./default.repository.js";
import { ClientModel } from "../models/index.js";
import { ClientInterface } from "$types";

class ClientRepository extends DefaultRepository<ClientInterface> {
  constructor() {
    super(ClientModel, { path: "address.city" });
  }
}

export default new ClientRepository();
