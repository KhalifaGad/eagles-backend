import Repository from "./baseRepository";
import { CredentialModel } from "../models";
import { CredentialInterface } from "../../types";

class CredentialRepository extends Repository<CredentialInterface> {
  constructor() {
    super(CredentialModel);
  }
}

export default new CredentialRepository();
