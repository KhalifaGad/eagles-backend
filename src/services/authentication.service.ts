import jwt from "jsonwebtoken";
import { credentialRepository } from "../mongoDB/repositories";
import DefaultService from "./default.service";
import { CredentialInterface } from "../types";
import { verifyHash } from "../utilities";
import exceptions from "../errors";
import config from "../../config";

class AuthenticationService extends DefaultService<CredentialInterface> {
  constructor() {
    super(credentialRepository);
  }

  // TODO: Remove the password

  login = async ({
    mobile,
    password,
  }: {
    mobile: string;
    password: string;
  }): Promise<void | (CredentialInterface & { token: string })> => {
    const credential = await credentialRepository.findOne({ mobile });

    if (!credential || !(await verifyHash(credential.password as string, password))) {
      return exceptions.throwUnauthorized("Invalid credentials");
    }

    delete credential.password;
    return {
      ...credential,
      token: jwt.sign(credential, config.jwtSecret, { expiresIn: config.jwtLifeTime }),
    };
  };
}

export default new AuthenticationService();
