import { Types } from "mongoose";
import { badData } from "../errors";
import { createHash } from "../utilities";
import DefaultRepository, { companyRepository, credentialRepository } from "../mongoDB/repositories";
import DefaultService from "./default.service";
import { AccountEnum, CompanyInterface, CredentialInterface, MerchantInterface, ProbablyWithPassword } from "../types";

interface CompanyMutationInterface extends CompanyInterface {
  employees: ProbablyWithPassword<MerchantInterface>[];
}

class CompanyService extends DefaultService<CompanyInterface> {
  constructor(private credentialRepository: DefaultRepository<CredentialInterface>) {
    super(companyRepository);
  }

  create = async (data: CompanyMutationInterface) => {
    const employeesWithPassword: ProbablyWithPassword<MerchantInterface>[] = [];
    const companyPayload = {
      ...data,
      employees: data.employees.map(employee => {
        const { password, ...employeeData } = employee;
        employeesWithPassword.push({ ...employeeData, password });
        return employeeData;
      }),
    };

    if (employeesWithPassword.length) {
      const existingEmployees = await this.credentialRepository.findMany({
        mobile: { $in: employeesWithPassword.map(employee => employee.mobile) },
      });
      if (existingEmployees.length) {
        const exisingMobileNumbers = existingEmployees.map(employee => employee.mobile).join(", ");
        const errorMessage = "مستخدم من قبل " + exisingMobileNumbers + "رقم الجولات ";
        throw badData(errorMessage);
      }
    }

    const company = await this.repository.create(companyPayload);
    if (employeesWithPassword.length) {
      // eslint-disable-next-line no-loops/no-loops
      for (const employee of employeesWithPassword) {
        await this.credentialRepository.create({
          mobile: employee.mobile,
          account: company,
          accountType: AccountEnum.Company,
          password: await createHash(String(employee.password)),
        });
      }
    }
    return company;
  };

  updateEmployees = async (id: string, data: ProbablyWithPassword<MerchantInterface>[]) => {
    const company = await this.repository.findById(new Types.ObjectId(id));
    if (!company) throw badData("الشركة غير موجودة");

    const employeesWithPassword = data.filter(employee => !!employee.password);

    if (employeesWithPassword.length) {
      // eslint-disable-next-line no-loops/no-loops
      for (const employee of employeesWithPassword) {
        await this.credentialRepository.upsert(
          {
            mobile: employee.mobile,
            account: company,
            accountType: AccountEnum.Company,
            password: await createHash(String(employee.password)),
          },
          "mobile"
        );
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const employees = data.map(({ password, ...employee }) => employee);

    return this.repository.updateWhereId(new Types.ObjectId(id), { employees });
  };
}

export default new CompanyService(credentialRepository);
