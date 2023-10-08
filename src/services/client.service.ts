import { clientRepository } from "$infra";
import { ClientInterface } from "$types";
import DefaultService from "./default.service.js";

class ClientService extends DefaultService<ClientInterface> {
  constructor() {
    super(clientRepository);
  }
}

export default new ClientService();
