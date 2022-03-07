import { companyRepository } from "../mongo/repositories";
import { CompanyEntity } from "../types";

export const createCompany = async (
  company: CompanyEntity
): Promise<CompanyEntity> => companyRepository.create(company);

export const listCompanies = async (): Promise<CompanyEntity[]> =>
  companyRepository.list();
