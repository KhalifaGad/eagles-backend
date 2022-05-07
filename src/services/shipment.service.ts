import { shipmentRepository } from "../mongoDB/repositories";
import DefaultService from "./default.service";
import { ShipmentInterface } from "../types";

class ShipmentService extends DefaultService<ShipmentInterface> {
  constructor() {
    super(shipmentRepository);
  }
}

export default new ShipmentService();
