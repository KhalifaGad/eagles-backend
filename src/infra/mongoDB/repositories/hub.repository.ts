import DefaultRepository from "./default.repository.js";
import { HubModel } from "../models/index.js";
import { HubInterface } from "$types";

class HubRepository extends DefaultRepository<HubInterface> {
  constructor() {
    super(HubModel, { path: "address.city" });
  }
}

export default new HubRepository();
