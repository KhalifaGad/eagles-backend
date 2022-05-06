import Repository from "./baseRepository";
import { RideModel } from "../models";
import { RideInterface } from "../../types";

class RideRepository extends Repository<RideInterface> {
  constructor() {
    super(RideModel);
  }
}

export default new RideRepository();
