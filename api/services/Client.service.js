import { ClientUseCases } from "../domain/useCases";
import ErrorService from "./Error.service";
import { repositories as repos } from "../infra/db/Mongo";

class ClientService {
  async add(clientData, addressData, branchId) {
    try {
      const client = await ClientUseCases.addClient(
        { ...clientData, byBranchId: branchId },
        addressData
      );
      return client;
    } catch (err) {
      return ErrorService.handleError(err);
    }
  }

  async list() {
    try {
      return await repos.Client.list();
    } catch (err) {
      return ErrorService.handleError(err);
    }
  }
}

export default new ClientService();
