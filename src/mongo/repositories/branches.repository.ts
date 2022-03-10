import Repository from "./baseRepository";
import { branchModel } from "../schemas";
import { BranchInterface } from "../../types";

class BranchesRepository extends Repository<BranchInterface> {
  constructor() {
    super(branchModel);
  }
}

export default new BranchesRepository();
