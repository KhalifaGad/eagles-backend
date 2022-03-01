import { CompanyUseCases } from "../domain/useCases";
import { repositories as repos } from "../infra/db/Mongo";
import ErrorService from "./Error.service";

class CompanyService {
  async add(companytData, addressData, managersData, branchId) {
    try {
      return await CompanyUseCases.addCompany(
        { ...companytData, byBranchId: branchId },
        managersData,
        addressData
      );
    } catch (err) {
      return ErrorService.handleError(err);
    }
  }

  async list() {
    try {
      return await repos.Company.list();
    } catch (err) {
      return ErrorService.handleError(err);
    }
  }
}

export default new CompanyService();
