import DefaultController from "./default.controller";
import { rideService } from "../services";
import { RideInterface } from "../types";

class RideController extends DefaultController<RideInterface> {
  constructor() {
    super(rideService);
  }
}

export default new RideController();
