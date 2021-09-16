import BaseRepo from "../baseRepo";
import Model from "./visit.model";

class VisitRepo extends BaseRepo {
  constructor() {
    super(Model);
  }
}

export default new VisitRepo();
