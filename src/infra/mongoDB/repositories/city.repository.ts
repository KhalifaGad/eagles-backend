import DefaultRepository from "./default.repository.js";
import { CityModel } from "../models/index.js";
import { CityInterface } from "$types";

class CityRepository extends DefaultRepository<CityInterface> {
  constructor() {
    super(CityModel);
  }
}

export default new CityRepository();
