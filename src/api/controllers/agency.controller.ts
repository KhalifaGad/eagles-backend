import { agencyService } from "$services";
import { AgencyInterface } from "$types";
import DefaultController from "./default.controller.js";

class AgencyController extends DefaultController<AgencyInterface> {
  constructor() {
    super(agencyService);
  }
}

export default new AgencyController();
