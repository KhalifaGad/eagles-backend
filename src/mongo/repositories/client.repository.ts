import Repository from "./baseRepository";
import { clientModel, ClientDocument } from "../schemas";

class ClientRepository extends Repository<ClientDocument> {
  constructor() {
    super(clientModel);
  }
}

export default new ClientRepository();
