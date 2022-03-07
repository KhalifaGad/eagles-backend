import { packRepository } from "../mongo/repositories";
import { PackEntity } from "../types";

export const createPack = async (company: PackEntity): Promise<PackEntity> =>
  packRepository.create(company);
