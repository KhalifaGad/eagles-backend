import Repository from "./baseRepository";
import { organizationModel } from "../schemas";
import { OrganizationInterface } from "../../types";

class OrganizationsRepository extends Repository<OrganizationInterface> {
  constructor() {
    super(organizationModel);
  }
}

export default new OrganizationsRepository();
