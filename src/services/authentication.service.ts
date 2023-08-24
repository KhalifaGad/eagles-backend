import { sign } from "jsonwebtoken";
import { Types } from "mongoose";
import EmployeeService from "./employee.service";
import config from "../../config";
import { unauthorized } from "../errors";
import { destroyProperties } from "../helpers";
import { credentialRepository } from "../mongoDB/repositories";
import { AccountEnum, CompanyInterface, CredentialInterface, ListArgumentsInterface, ListInterface } from "../types";
import { createHash, verifyHash } from "../utilities";
import DefaultService from "./default.service";

class AuthenticationService extends DefaultService<CredentialInterface> {
  constructor() {
    super(credentialRepository);
  }

  login = async ({
    mobile,
    password,
  }: {
    mobile: string;
    password: string;
  }): Promise<void | (CredentialInterface & { token: string })> => {
    const credential = await credentialRepository.findOne({ mobile });

    if (!credential || !(await verifyHash(credential.password as string, password))) {
      throw unauthorized("رقم الهاتف المحمول أو كلمة المرور غير صحيحة");
    }

    if (credential.accountType === AccountEnum.Company) {
      (credential.account as CompanyInterface).employees = (credential.account as CompanyInterface).employees.filter(
        employee => employee.mobile === mobile
      );
    }

    const token = sign(credential, config.jwtSecret, { expiresIn: config.jwtLifeTime });

    return destroyProperties({ ...credential, token }, ["password"]);
  };

  list = async (
    listArguments: ListArgumentsInterface<CredentialInterface>
  ): Promise<ListInterface<CredentialInterface>> => {
    const { data, totalCount } = await credentialRepository.list(listArguments);

    return { data: data.map(credential => destroyProperties(credential, ["password"])), totalCount };
  };

  show = async (id: string) => {
    const credential = await credentialRepository.findById(new Types.ObjectId(id));

    if (credential.accountType === AccountEnum.Company) {
      (credential.account as CompanyInterface).employees = (credential.account as CompanyInterface).employees.filter(
        employee => employee.mobile === credential.mobile
      );
    }
    return destroyProperties(credential, ["password"]);
  };

  create = async ({ password, ...data }: CredentialInterface) =>
    destroyProperties(await credentialRepository.create({ ...data, password: await createHash(password as string) }), [
      "password",
    ]);

  bulkCreate = async (data: CredentialInterface[]): Promise<CredentialInterface[]> => {
    data = await Promise.all(
      data.map(async ({ password, ...element }) => ({ ...element, password: await createHash(password as string) }))
    );

    return (await credentialRepository.insertMany(data)).map(credential => destroyProperties(credential, ["password"]));
  };

  update = async (id: string, { password, ...data }: CredentialInterface) => {
    const credential = await credentialRepository.updateWhereId(
      new Types.ObjectId(id),
      password ? { ...data, password: await createHash(password) } : data
    );
    if (!credential) return null;

    if(data.mobile){
      await this.updateCredentialAccountMobile(String(credential.account._id), credential.accountType, data.mobile)
    }

    return this.show(id)
  };

  updateCredentialAccountMobile = async (accountId: string, accountType: AccountEnum, mobile: string) =>  {
    if(!accountId) return;
    if(accountType === AccountEnum.Employee){
      await EmployeeService.update(accountId, { mobile });
    }
  }
}

export default new AuthenticationService();
