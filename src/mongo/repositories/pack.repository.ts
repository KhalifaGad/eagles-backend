import Repository from "./baseRepository";
import { packModel, PackDocument } from "../schemas";

class PackRepository extends Repository<PackDocument> {
  constructor() {
    super(packModel);
  }
}

export default new PackRepository();
