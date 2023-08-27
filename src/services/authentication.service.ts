import { sign } from "jsonwebtoken";
import EmployeeService from "./employee.service";
import config from "../../config";
import { badData, unauthorized } from "../errors";
import { destroyProperties } from "../helpers";
import { credentialRepository } from "../mongoDB/repositories";
import {
  AccountEnum,
  CompanyInterface,
  CredentialInterface,
  EmployeeInterface,
  ListArgumentsInterface,
  ListInterface,
} from "../types";
import { createHash, getEntityRef, verifyHash } from "../utilities";
import DefaultService from "./default.service";

class AuthenticationService extends DefaultService<CredentialInterface> {
  constructor() {
    super(credentialRepository);
    this.list = this.list.bind(this);
    this.login = this.login.bind(this);
    this.show = this.show.bind(this);
    this.create = this.create.bind(this);
    this.bulkCreate = this.bulkCreate.bind(this);
    this.update = this.update.bind(this);
    this.updateCredentialAccountMobile = this.updateCredentialAccountMobile.bind(this);
    this.getTokenPayload = this.getTokenPayload.bind(this);
    this.getCompanyTokenPayload = this.getCompanyTokenPayload.bind(this);
    this.getEmployeeTokenPayload = this.getEmployeeTokenPayload.bind(this);
  }

  async login({
    mobile,
    password,
  }: {
    mobile: string;
    password: string;
  }): Promise<void | (CredentialInterface & { token: string })> {
    const credential = await credentialRepository.findOne({ mobile });

    if (!credential || !(await verifyHash(credential.password as string, password))) {
      throw unauthorized("رقم الهاتف المحمول أو كلمة المرور غير صحيحة");
    }

    if (credential.accountType === AccountEnum.Company) {
      (credential.account as CompanyInterface).employees = (credential.account as CompanyInterface).employees.filter(
        employee => employee.mobile === mobile
      );
    }

    const tokenPayload = this.getTokenPayload(credential, mobile);

    const token = sign(tokenPayload, config.jwtSecret, { expiresIn: config.jwtLifeTime });

    return destroyProperties({ ...credential, token }, ["password"]);
  }

  async list (
    listArguments: ListArgumentsInterface<CredentialInterface>
  ): Promise<ListInterface<CredentialInterface>> {
    const { data, totalCount } = await credentialRepository.list(listArguments);

    return { data: data.map(credential => destroyProperties(credential, ["password"])), totalCount };
  }

  async show(id: string) {
    const credential = await credentialRepository.findById(id);

    if (credential.accountType === AccountEnum.Company) {
      (credential.account as CompanyInterface).employees = (credential.account as CompanyInterface).employees.filter(
        employee => employee.mobile === credential.mobile
      );
    }
    return destroyProperties(credential, ["password"]);
  }

  async create({ password, ...data }: CredentialInterface) {
    return destroyProperties(
      await credentialRepository.create({ ...data, password: await createHash(password as string) }),
      ["password"]
    );
  }

  async bulkCreate(data: CredentialInterface[]): Promise<CredentialInterface[]> {
    data = await Promise.all(
      data.map(async ({ password, ...element }) => ({ ...element, password: await createHash(password as string) }))
    );

    return (await credentialRepository.insertMany(data)).map(credential => destroyProperties(credential, ["password"]));
  }

  async update(id: string, { password, ...data }: CredentialInterface) {
    const credential = await credentialRepository.updateWhereId(
      id,
      password ? { ...data, password: await createHash(password) } : data
    );
    if (!credential) return null;

    if (data.mobile) {
      await this.updateCredentialAccountMobile(getEntityRef(credential.account), credential.accountType, data.mobile);
    }

    return this.show(id);
  }

  private async updateCredentialAccountMobile(accountId: string, accountType: AccountEnum, mobile: string) {
    if (!accountId) return;
    if (accountType === AccountEnum.Employee) {
      await EmployeeService.update(accountId, { mobile });
    }
  }

  private getTokenPayload(credential: CredentialInterface, mobile: string) {
    if (credential.accountType === AccountEnum.Company) {
      return this.getCompanyTokenPayload(credential, mobile);
    } else {
      return this.getEmployeeTokenPayload(credential);
    }
  }

  private getCompanyTokenPayload(credential: CredentialInterface, mobile: string) {
    const { employees, ...company } = credential.account as CompanyInterface;
    const user = employees.find(employee => employee.mobile === mobile);
    if (!user) throw badData("بيانات المستخدم بها خلل، برجاء الرجوع لخدمة العملاء");
    return {
      credentialId: credential._id,
      accountType: AccountEnum.Company,
      user,
      company,
    };
  }

  private getEmployeeTokenPayload(credential: CredentialInterface) {
    const employee = credential.account as EmployeeInterface;
    return {
      credentialId: credential._id,
      accountType: AccountEnum.Employee,
      user: employee,
    };
  }
}

export default new AuthenticationService();
