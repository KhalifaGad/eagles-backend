import { MongooseRepos as repos } from "../../infra/db/Mongo/repositories";
import { PackEntity } from "../entities";

async function addPack(packData, branchId) {
  const pack = new PackEntity({ ...packData, originBranchId: branchId });
  return repos.Pack.create(pack);
}

export { addPack };
