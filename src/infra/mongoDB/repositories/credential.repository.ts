import DefaultRepository from "./default.repository.js";
import { CredentialModel } from "../models/index.js";
import { CredentialInterface } from "$types";

class CredentialRepository extends DefaultRepository<CredentialInterface> {
  constructor() {
    super(CredentialModel, {
      path: "account",
      populate: [{ path: "address.city" }, { path: "agency", populate: "address", strictPopulate: false }],
    });
  }
}

export default new CredentialRepository();
