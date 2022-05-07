import DefaultController from "./default.controller";
import { credentialService } from "../services";
import { CredentialInterface } from "../types";

class CredentialController extends DefaultController<CredentialInterface> {
  constructor() {
    super(credentialService);
  }
}

export default new CredentialController();
