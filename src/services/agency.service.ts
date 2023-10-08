import { agencyRepository } from "$infra";
import { AgencyInterface } from "$types";
import DefaultService from "./default.service.js";

class AgencyService extends DefaultService<AgencyInterface> {
  constructor() {
    super(agencyRepository);
  }
}

export default new AgencyService();
