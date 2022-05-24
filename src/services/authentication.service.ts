import { Types } from "mongoose";
import { sign } from "jsonwebtoken";
import { credentialRepository } from "../mongoDB/repositories";
import DefaultService from "./default.service";
import { CredentialInterface, ListArgumentsInterface, ListInterface } from "../types";
import { createHash, verifyHash } from "../utilities";
import { destroyProperties } from "../helpers";
import { unauthorized } from "../errors";
import config from "../../config";

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

    return destroyProperties(
      { ...credential, token: sign(credential, config.jwtSecret, { expiresIn: config.jwtLifeTime }) },
      ["password"]
    );
  };

  list = async (
    listArguments: ListArgumentsInterface<CredentialInterface>
  ): Promise<ListInterface<CredentialInterface>> => {
    const { data, totalCount } = await credentialRepository.list(listArguments);

    return { data: data.map(credential => destroyProperties(credential, ["password"])), totalCount };
  };

  show = async (id: string) =>
    destroyProperties(await credentialRepository.findById(new Types.ObjectId(id)), ["password"]);

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

  update = async (id: string, { password, ...data }: CredentialInterface) =>
    destroyProperties(
      await credentialRepository.updateWhereId(
        new Types.ObjectId(id),
        password ? { ...data, password: await createHash(password) } : data
      ),
      ["password"]
    );
}

export default new AuthenticationService();
