import DefaultController from "./default.controller";
import { clientService } from "../services";
import { ClientInterface } from "../types";

class ClientController extends DefaultController<ClientInterface> {
  constructor() {
    super(clientService);
  }
}

export default new ClientController();
