import { organizationRepository } from "../mongo/repositories";
import { OrganizationInterface } from "../types";

export const createorganization = async (
  organization: OrganizationInterface
): Promise<OrganizationInterface> =>
  organizationRepository.create(organization);

export const listCompanies = async (): Promise<OrganizationInterface[]> =>
  organizationRepository.list();
