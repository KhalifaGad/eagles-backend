import DefaultController from "./default.controller";
import { vehicleService } from "../services";
import { VehicleInterface } from "../types";

class VehicleController extends DefaultController<VehicleInterface> {
  constructor() {
    super(vehicleService);
  }
}

export default new VehicleController();
