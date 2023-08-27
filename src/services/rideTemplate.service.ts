import { rideTemplateRepository } from "../mongoDB/repositories";
import DefaultService from "./default.service";
import { RideTemplateInterface } from "../types";

class RideTemplateService extends DefaultService<RideTemplateInterface> {
  constructor() {
    super(rideTemplateRepository);
  }
}

export default new RideTemplateService();
