import DefaultRepository from "./default.repository";
import { VehicleModel } from "../models";
import { VehicleInterface } from "../../types";

class VehicleRepository extends DefaultRepository<VehicleInterface> {
  constructor() {
    super(VehicleModel);
  }
}

export default new VehicleRepository();
