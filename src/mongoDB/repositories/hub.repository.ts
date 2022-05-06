import Repository from "./baseRepository";
import { HubModel } from "../models";
import { HubInterface } from "../../types";

class HubRepository extends Repository<HubInterface> {
  constructor() {
    super(HubModel);
  }
}

export default new HubRepository();
