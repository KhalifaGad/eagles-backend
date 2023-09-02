import { badData } from "../errors";
import { createHash, getEntityRef } from "../utilities";
import DefaultRepository, { companyRepository, credentialRepository } from "../mongoDB/repositories";
import DefaultService from "./default.service";
import {
  AccountEnum,
  CompanyInterface,
  CredentialInterface,
  MerchantInterface,
  ID,
  ProbablyWithPassword,
} from "../types";

interface CompanyMutationInterface extends CompanyInterface {
  employees: ProbablyWithPassword<MerchantInterface>[];
}

class CompanyService extends DefaultService<CompanyInterface> {
  constructor(private credentialRepository: DefaultRepository<CredentialInterface>) {
    super(companyRepository);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.updateEmployeesCredentials = this.updateEmployeesCredentials.bind(this);
    this.addPasswordToEmployees = this.addPasswordToEmployees.bind(this);
    this.deleteEmployeeCredentials = this.deleteEmployeeCredentials.bind(this);
    this.updateEmployeesMobile = this.updateEmployeesMobile.bind(this);
  }

  async create(data: CompanyMutationInterface) {
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
          account: company._id,
          accountType: AccountEnum.Company,
          password: await createHash(String(employee.password)),
        });
      }
    }
    return company;
  }

  async update(id: ID, data: CompanyMutationInterface) {
    const company = await this.repository.findById(id);
    if (!company) throw badData("الشركة غير موجودة");

    await this.updateEmployeesCredentials(company, data.employees);
    return super.update(id, data);
  }

  private async updateEmployeesCredentials(
    company: CompanyInterface,
    employees: ProbablyWithPassword<MerchantInterface>[]
  ) {
    if (!company._id) return;
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
    await this.addPasswordToEmployees(newEmployeesWithPassword, company._id);

    await this.deleteEmployeeCredentials(deletedEmployees);

    const mobileUpdatedEmployees = updatedEmployees.filter(employee => {
      const existingEmployee = existingEmployees.find(existingEmployee => existingEmployee._id === employee._id);
      return existingEmployee && existingEmployee.mobile !== employee.mobile;
    });

    if (!mobileUpdatedEmployees.length) return;

    await this.updateEmployeesMobile(mobileUpdatedEmployees, existingEmployees, company._id);
  }

  private async updateEmployeesMobile(
    mobileUpdatedEmployees: MerchantInterface[],
    allEmployees: MerchantInterface[],
    companyId: ID
  ) {
    const credentials = await this.credentialRepository.findMany({ account: companyId });
    for (const mobileUpdatedEmployee of mobileUpdatedEmployees) {
      const oldEmployee = allEmployees.find(existingEmployee => existingEmployee._id === mobileUpdatedEmployee._id);
      const employeeCredential = credentials.find(credential => credential.mobile === oldEmployee?.mobile);
      if (!employeeCredential?._id) continue;
      await this.credentialRepository.updateWhereId(employeeCredential._id, {
        mobile: mobileUpdatedEmployee.mobile,
      });
    }
  }

  private async addPasswordToEmployees(employees: ProbablyWithPassword<MerchantInterface>[], companyId: ID) {
    for (const employee of employees) {
      await this.credentialRepository.create({
        mobile: employee.mobile,
        account: companyId,
        accountType: AccountEnum.Company,
        password: await createHash(String(employee.password)),
      });
    }
  }

  private async deleteEmployeeCredentials(employees: MerchantInterface[]) {
    if (!employees.length) return;

    await this.credentialRepository.deleteBy({ mobile: { $in: employees.map(employee => employee.mobile) } });
  }
}

export default new CompanyService(credentialRepository);
