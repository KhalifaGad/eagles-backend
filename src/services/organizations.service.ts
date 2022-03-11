import {
  organizationsRepository,
  branchesRepository,
} from "../mongo/repositories";
import { OrganizationInterface, BranchInterface } from "../types";

export const listOrganizations = async (): Promise<OrganizationInterface[]> =>
  organizationsRepository.list();

export const showOrganization = async (
  name: string
): Promise<OrganizationInterface & { branches: BranchInterface[] }> => {
  const organization = await organizationsRepository.findOne({ name });

  return {
    ...organization,
    branches: await branchesRepository.list({
      organizationId: organization?._id,
    }),
  };
};

export const createOrganization = async (
  organization: OrganizationInterface,
  branches: BranchInterface[] = []
): Promise<OrganizationInterface & { branches: BranchInterface[] }> => {
  const createdOrganization = await organizationsRepository.create(
    organization
  );

  return {
    ...createdOrganization,
    branches: await branchesRepository.insertMany(branches),
  };
};

export const createBranch = async (
  branch: BranchInterface
): Promise<BranchInterface> => branchesRepository.create(branch);
