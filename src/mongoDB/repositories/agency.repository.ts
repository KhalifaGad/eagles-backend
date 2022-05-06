import Repository from "./baseRepository";
import { AgencyModel } from "../models";
import { AgencyInterface } from "../../types";

class AgencyRepository extends Repository<AgencyInterface> {
  constructor() {
    super(AgencyModel);
  }
}

export default new AgencyRepository();
