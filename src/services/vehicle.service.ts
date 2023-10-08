import { vehicleRepository } from "$infra";
import { VehicleInterface } from "$types";
import DefaultService from "./default.service.js";

class VehicleService extends DefaultService<VehicleInterface> {
  constructor() {
    super(vehicleRepository);
  }
}

export default new VehicleService();
