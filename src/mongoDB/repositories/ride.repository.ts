import DefaultRepository from "./default.repository";
import { RideModel } from "../models";
import { RideInterface } from "../../types";

class RideRepository extends DefaultRepository<RideInterface> {
  constructor() {
    super(RideModel);
  }
}

export default new RideRepository();
