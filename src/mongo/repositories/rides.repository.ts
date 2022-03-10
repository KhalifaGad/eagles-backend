import Repository from "./baseRepository";
import { rideModel } from "../schemas";
import { RideInterface } from "../../types";

class RidesRepository extends Repository<RideInterface> {
  constructor() {
    super(rideModel);
  }
}

export default new RidesRepository();
