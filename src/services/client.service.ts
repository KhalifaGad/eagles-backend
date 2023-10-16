import { clientRepository } from "$infra";
import { ClientInterface } from "$types";
import { removeEmptyStrings } from "~utilities/index.js";
import DefaultService from "./default.service.js";

class ClientService extends DefaultService<ClientInterface> {
  constructor() {
    super(clientRepository);
  }

  create(payload: ClientInterface) {
    return super.create(removeEmptyStrings(payload));
  }
}

export default new ClientService();
