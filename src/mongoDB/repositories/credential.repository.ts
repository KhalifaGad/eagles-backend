import DefaultRepository from "./default.repository";
import { CredentialModel } from "../models";
import { CredentialInterface } from "../../types";

class CredentialRepository extends DefaultRepository<CredentialInterface> {
  constructor() {
    super(CredentialModel);
  }
}

export default new CredentialRepository();
