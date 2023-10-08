import DefaultRepository from "./default.repository.js";
import { VehicleModel } from "../models/index.js";
import { VehicleInterface } from "$types";

class VehicleRepository extends DefaultRepository<VehicleInterface> {
  constructor() {
    super(VehicleModel);
  }
}

export default new VehicleRepository();
