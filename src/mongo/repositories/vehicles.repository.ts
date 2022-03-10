import Repository from "./baseRepository";
import { vehicleModel } from "../schemas";
import { VehicleInterface } from "../../types";

class VehiclesRepository extends Repository<VehicleInterface> {
  constructor() {
    super(vehicleModel);
  }
}

export default new VehiclesRepository();
