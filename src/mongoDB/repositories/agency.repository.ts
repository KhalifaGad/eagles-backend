import DefaultRepository from "./default.repository";
import { AgencyModel } from "../models";
import { AgencyInterface } from "../../types";

class AgencyRepository extends DefaultRepository<AgencyInterface> {
  constructor() {
    super(AgencyModel);
  }
}

export default new AgencyRepository();
