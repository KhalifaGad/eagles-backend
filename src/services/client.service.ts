import { clientRepository } from "../mongoDB/repositories";
import DefaultService from "./default.service";
import { ClientInterface } from "../types";

class ClientService extends DefaultService<ClientInterface> {
  constructor() {
    super(clientRepository);
  }
}

export default new ClientService();
