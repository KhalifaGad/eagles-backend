import { sign } from "jsonwebtoken";
import { FilterQuery } from "mongoose";
import { credentialRepository } from "../mongoDB/repositories";
import DefaultService from "./default.service";
import { CredentialInterface } from "../types";
import { createHash, verifyHash } from "../utilities";
import exceptions from "../errors";
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
      exceptions.throwUnauthorized("Invalid credentials");
    }

    delete credential.password;
    return {
      ...credential,
      token: sign(credential, config.jwtSecret, { expiresIn: config.jwtLifeTime }),
    };
  };

  list = async (filter: FilterQuery<CredentialInterface> = {}) => {
    return (await credentialRepository.list(filter)).map(element => {
      delete element.password;
      return element;
    });
  };

  show = async (id: string) => {
    const data = await credentialRepository.findById(id);
    delete data.password;
    return data;
  };

  create = async ({ password, ...data }: CredentialInterface) => {
    return credentialRepository.create({
      ...data,
      password: await createHash(password as string),
    });
  };

  bulkCreate = async (data: CredentialInterface[]): Promise<CredentialInterface[]> => {
    return credentialRepository.insertMany(
      await Promise.all(
        data.map(async ({ password, ...element }) => ({
          ...element,
          password: await createHash(password as string),
        }))
      )
    );
  };

  update = async (id: string, { password, ...data }: CredentialInterface) => {
    return credentialRepository.updateWhereId(id, {
      ...data,
      password: await createHash(password as string),
    });
  };
}

export default new AuthenticationService();
