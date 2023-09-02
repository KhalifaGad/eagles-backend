import { createHash } from "../utilities";
import { badData } from "../errors";
import DefaultRepository, { credentialRepository, employeeRepository } from "../mongoDB/repositories";
import { AccountEnum, CredentialInterface, EmployeeInterface, ID, ProbablyWithPassword } from "../types";
import DefaultService from "./default.service";

class EmployeeService extends DefaultService<EmployeeInterface> {
  constructor(private credentialRepository: DefaultRepository<CredentialInterface>) {
    super(employeeRepository);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
  }

  async create(payload: ProbablyWithPassword<EmployeeInterface>) {
    const { password, ...employeeData } = payload;
    const shouldCreateCredentials = !!password;
    if (shouldCreateCredentials) {
      const isMobileExist = (await this.credentialRepository.count({ mobile: payload.mobile })) > 0;
      if (isMobileExist) throw badData("رقم الجوال مستخدم من قبل");
    }

    const account = await employeeRepository.create(employeeData);
    if (shouldCreateCredentials) {
      await this.credentialRepository.create({
        mobile: payload.mobile,
        account: account._id,
        accountType: AccountEnum.Employee,
        password: await createHash(password),
      });
    }
    return account;
  }

  async update(id: ID, data: ProbablyWithPassword<Partial<EmployeeInterface>>) {
    const { password, ...employeeData } = data;
    if (password && employeeData.mobile) {
      await this.credentialRepository.upsert(
        {
          mobile: employeeData.mobile,
          account: id,
          accountType: AccountEnum.Employee,
          password: await createHash(password),
        },
        "mobile"
      );
    }
    return this.repository.updateWhereId(id, employeeData);
  }
}

export default new EmployeeService(credentialRepository);
