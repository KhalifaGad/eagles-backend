import { clientService } from "$services";
import { ClientInterface } from "$types";
import DefaultController from "./default.controller.js";

class ClientController extends DefaultController<ClientInterface> {
  constructor() {
    super(clientService);
  }
}

export default new ClientController();
