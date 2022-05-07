import { credentialRepository } from "../mongoDB/repositories";
import DefaultService from "./default.service";
import { CredentialInterface } from "../types";

class CredentialService extends DefaultService<CredentialInterface> {
  constructor() {
    super(credentialRepository);
  }
}

export default new CredentialService();
