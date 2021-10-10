import {
  CompanyEntity,
  CompanyManagerEntity,
  AddressEntity,
  OCCUPANT_TYPES,
} from "../entities";
import { MongooseRepos as repos } from "../../infra/db/Mongo/repositories";

async function addCompany(companyData, managersData, addressData) {
  const isManagersExist = managersData.length > 0;
  let company = new CompanyEntity(companyData);
  let address = new AddressEntity({
    ...addressData,
    occupantType: OCCUPANT_TYPES.company,
  });

  address = await repos.Address.create(address, false);
  company.address = address._id;
  company = await repos.Company.create(company, isManagersExist);
  address.occupantId = company._id;
  await address.save();
  if (isManagersExist) {
    let managers = managersData.map((managerData) => {
      const manager = new CompanyManagerEntity(managerData);
      manager.companyId = company._id;
      return manager;
    });
    managers = await repos.CompanyManager.insertMany(managers);
    company.managers = managers;
  }
  company.address = address;
  return company;
}

export { addCompany };
