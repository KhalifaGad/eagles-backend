import DefaultController from "./default.controller";
import { rideTemplateService } from "../services";
import { RideTemplateInterface } from "../types";

class RideTemplateController extends DefaultController<RideTemplateInterface> {
  constructor() {
    super(rideTemplateService);
  }
}

export default new RideTemplateController();
