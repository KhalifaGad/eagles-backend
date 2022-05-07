import DefaultController from "./default.controller";
import { agencyService } from "../services";
import { AgencyInterface } from "../types";

class AgencyController extends DefaultController<AgencyInterface> {
  constructor() {
    super(agencyService);
  }
}

export default new AgencyController();
