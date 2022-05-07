import DefaultController from "./default.controller";
import { shipmentService } from "../services";
import { ShipmentInterface } from "../types";

class ShipmentController extends DefaultController<ShipmentInterface> {
  constructor() {
    super(shipmentService);
  }
}

export default new ShipmentController();
