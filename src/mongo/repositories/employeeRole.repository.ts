import Repository from "./baseRepository";
import { rolesModel, RolesDocument } from "../schemas";

class roleRepository extends Repository<RolesDocument> {
  constructor() {
    super(rolesModel);
  }
}

export default new roleRepository();
