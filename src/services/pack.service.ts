import { packRepository } from "../mongo/repositories";
import { PackInterface } from "../types";

export const createPack = async (
  organization: PackInterface
): Promise<PackInterface> => packRepository.create(organization);
