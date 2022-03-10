import Repository from "./baseRepository";
import { organizationModel, OrganizationDocument } from "../schemas";

class organizationRepository extends Repository<OrganizationDocument> {
  constructor() {
    super(organizationModel);
  }
}

export default new organizationRepository();
