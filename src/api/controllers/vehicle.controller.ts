import { vehicleService } from "$services";
import { VehicleInterface } from "$types";
import DefaultController from "./default.controller.js";

class VehicleController extends DefaultController<VehicleInterface> {
  constructor() {
    super(vehicleService);
  }
}

export default new VehicleController();
