import BaseRepo from "../baseRepo";
import Model from "./branchOwner.model";

class BranchOwnerRepo extends BaseRepo {
  constructor() {
    super(Model);
  }
}

export default new BranchOwnerRepo();
