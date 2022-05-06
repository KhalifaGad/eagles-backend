import Repository from "./baseRepository";
import { ClientModel } from "../models";
import { ClientInterface } from "../../types";

class ClientRepository extends Repository<ClientInterface> {
  constructor() {
    super(ClientModel);
  }
}

export default new ClientRepository();
