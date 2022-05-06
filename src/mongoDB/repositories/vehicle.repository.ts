import Repository from "./baseRepository";
import { VehicleModel } from "../models";
import { VehicleInterface } from "../../types";

class VehicleRepository extends Repository<VehicleInterface> {
  constructor() {
    super(VehicleModel);
  }
}

export default new VehicleRepository();
