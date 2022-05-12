import DefaultRepository from "./default.repository";
import { HubModel } from "../models";
import { HubInterface } from "../../types";

class HubRepository extends DefaultRepository<HubInterface> {
  constructor() {
    super(HubModel, { path: "address.city" });
  }
}

export default new HubRepository();
