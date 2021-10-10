import { ClientUseCases } from "../domain/useCases";
import ErrorService from "./Error.service";

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
}

export default new ClientService();
