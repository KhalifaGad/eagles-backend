import Repository from "./baseRepository";
import { visitModel, VisitDocument } from "../schemas";

class VisitRepository extends Repository<VisitDocument> {
  constructor() {
    super(visitModel);
  }
}

export default new VisitRepository();
