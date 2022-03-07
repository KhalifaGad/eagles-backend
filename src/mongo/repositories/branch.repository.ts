import Repository from "./baseRepository";
import { branchModel, BranchDocument } from "../schemas";

class BranchRepository extends Repository<BranchDocument> {
  constructor() {
    super(branchModel);
  }
}

export default new BranchRepository();
