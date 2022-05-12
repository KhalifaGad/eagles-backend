import DefaultRepository from "./default.repository";
import { ClientModel } from "../models";
import { ClientInterface } from "../../types";

class ClientRepository extends DefaultRepository<ClientInterface> {
  constructor() {
    super(ClientModel, { path: "address.city" });
  }
}

export default new ClientRepository();
