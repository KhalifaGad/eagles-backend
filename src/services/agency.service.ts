import { agencyRepository } from "../mongoDB/repositories";
import DefaultService from "./default.service";
import { AgencyInterface } from "../types";

class AgencyService extends DefaultService<AgencyInterface> {
  constructor() {
    super(agencyRepository);
  }
}

export default new AgencyService();
