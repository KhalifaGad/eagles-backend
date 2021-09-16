import BaseRepo from "../baseRepo";
import Model from "./client.model";

class ClientRepo extends BaseRepo {
  constructor() {
    super(Model);
  }
}

export default new ClientRepo();
