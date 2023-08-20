import { Types } from "mongoose";
import { createHash } from "../utilities";
import { badData } from "../errors";
import DefaultRepository, { credentialRepository, employeeRepository } from "../mongoDB/repositories";
import { AccountEnum, CredentialInterface, EmployeeInterface, MongooseID, ProbablyWithPassword } from "../types";
import DefaultService from "./default.service";

class EmployeeService extends DefaultService<EmployeeInterface> {
  constructor(private credentialRepository: DefaultRepository<CredentialInterface>) {
    super(employeeRepository);
  }

  create = async (payload: ProbablyWithPassword<EmployeeInterface>) => {
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
        account: account,
        accountType: AccountEnum.Employee,
        password: await createHash(password),
      });
    }
    return account;
  };

  update = async (id: string, data: ProbablyWithPassword<EmployeeInterface>) => {
    const { password, ...employeeData } = data;
    if (password) {
      await this.credentialRepository.upsert(
        {
          mobile: employeeData.mobile,
          account: employeeData._id as MongooseID,
          accountType: AccountEnum.Employee,
          password: await createHash(password),
        },
        "mobile"
      );
    }
    return this.repository.updateWhereId(new Types.ObjectId(id), employeeData);
  };
}

export default new EmployeeService(credentialRepository);
