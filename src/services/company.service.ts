import { badData } from "../errors";
import { createHash, getEntityRef } from "../utilities";
import DefaultRepository, { companyRepository, credentialRepository } from "../mongoDB/repositories";
import DefaultService from "./default.service";
import { AccountEnum, CompanyInterface, CredentialInterface, MerchantInterface, ProbablyWithPassword } from "../types";

interface CompanyMutationInterface extends CompanyInterface {
  employees: ProbablyWithPassword<MerchantInterface>[];
}

class CompanyService extends DefaultService<CompanyInterface> {
  constructor(private credentialRepository: DefaultRepository<CredentialInterface>) {
    super(companyRepository);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.updateEmployeesCredentials = this.updateEmployeesCredentials.bind(this);
  }

  async create(data: CompanyMutationInterface){
    const employeesWithPassword: ProbablyWithPassword<MerchantInterface>[] = [];
    const companyPayload = {
      ...data,
      employees: data.employees.map(employee => {
        const { password, ...employeeData } = employee;
        employeesWithPassword.push({ ...employeeData, password });
        return employeeData;
      }),
    }

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
  }

  async update(id: string, data: CompanyMutationInterface) {
    const company = await this.repository.findById(id);
    if (!company) throw badData("الشركة غير موجودة");

    await this.updateEmployeesCredentials(company, data.employees);
    return super.update(id, data);
  }

  private async updateEmployeesCredentials (
    company: CompanyInterface,
    employees: ProbablyWithPassword<MerchantInterface>[]
  ) {
    const existingEmployees = company.employees;

    const updatedEmployees: ProbablyWithPassword<MerchantInterface>[] = [];
    const deletedEmployees: ProbablyWithPassword<MerchantInterface>[] = [];
    const newEmployees: ProbablyWithPassword<MerchantInterface>[] = [];

    for (const employee of employees) {
      const isNewEmployee = !employee._id;
      const isDeletedEmployee =
        !isNewEmployee && !existingEmployees.find(existingEmployee => existingEmployee._id === employee._id);
      const isUpdatedEmployee = !isNewEmployee && !isDeletedEmployee;
      if (isDeletedEmployee) {
        deletedEmployees.push(employee);
      }

      if (isUpdatedEmployee) {
        updatedEmployees.push(employee);
      }

      if (isNewEmployee) {
        newEmployees.push(employee);
      }
    }

    const newEmployeesWithPassword = newEmployees.filter(employee => !!employee.password);
    if (newEmployeesWithPassword.length) {
      for (const employee of newEmployeesWithPassword) {
        await this.credentialRepository.create({
          mobile: employee.mobile,
          account: company,
          accountType: AccountEnum.Company,
          password: await createHash(String(employee.password)),
        });
      }
    }

    if (deletedEmployees.length) {
      await this.credentialRepository.deleteBy({ mobile: { $in: deletedEmployees.map(employee => employee.mobile) } });
    }

    const mobileUpdatedEmployees = updatedEmployees.filter(employee => {
      const existingEmployee = existingEmployees.find(existingEmployee => existingEmployee._id === employee._id);
      return existingEmployee && existingEmployee.mobile !== employee.mobile;
    });

    if (mobileUpdatedEmployees.length) {
      const credentials = await this.credentialRepository.findMany({ account: company._id });
      for (const mobileUpdatedEmployee of mobileUpdatedEmployees) {
        const oldEmployee = existingEmployees.find(
          existingEmployee => existingEmployee._id === mobileUpdatedEmployee._id
        );
        const employeeCredential = credentials.find(credential => credential.mobile === oldEmployee?.mobile);
        if (!employeeCredential) continue;
        await this.credentialRepository.updateWhereId(getEntityRef(employeeCredential), {
          mobile: mobileUpdatedEmployee.mobile,
        });
      }
    }
  }
}

export default new CompanyService(credentialRepository);
