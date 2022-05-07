import { rideRepository } from "../mongoDB/repositories";
import DefaultService from "./default.service";
import { RideInterface } from "../types";

class RideService extends DefaultService<RideInterface> {
  constructor() {
    super(rideRepository);
  }
}

export default new RideService();
