import { vehicleRepository } from "../mongoDB/repositories";
import DefaultService from "./default.service";
import { VehicleInterface } from "../types";

class VehicleService extends DefaultService<VehicleInterface> {
  constructor() {
    super(vehicleRepository);
  }
}

export default new VehicleService();
