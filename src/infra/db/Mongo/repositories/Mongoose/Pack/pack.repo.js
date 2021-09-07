import BaseRepo from "../baseRepo";
import Model from "./pack.model";

class PackRepo extends BaseRepo {
  constructor() {
    super(Model);
  }
}

export default new PackRepo();
