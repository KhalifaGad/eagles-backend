import BaseRepo from "../baseRepo";
import Model from "./branch.model";

class BranchRepo extends BaseRepo {
  constructor() {
    super(Model);
  }
}

export default new BranchRepo();
