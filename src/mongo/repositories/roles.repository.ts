import Repository from "./baseRepository";
import { roleModel } from "../schemas";
import { RoleInterface } from "../../types";

class RolesRepository extends Repository<RoleInterface> {
  constructor() {
    super(roleModel);
  }
}

export default new RolesRepository();
