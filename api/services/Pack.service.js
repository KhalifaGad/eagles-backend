import { PackUseCases } from "../domain/useCases";
import ErrorService from "./Error.service";

class PackService {
  async add(packData, branchId) {
    try {
      return await PackUseCases.addPack(packData, branchId);
    } catch (err) {
      return ErrorService.handleError(err);
    }
  }
}

export default new PackService();
