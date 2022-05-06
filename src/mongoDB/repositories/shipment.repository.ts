import Repository from "./baseRepository";
import { ShipmentModel } from "../models";
import { ShipmentInterface } from "../../types";

class ShipmentRepository extends Repository<ShipmentInterface> {
  constructor() {
    super(ShipmentModel);
  }
}

export default new ShipmentRepository();
