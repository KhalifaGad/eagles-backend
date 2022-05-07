import DefaultRepository from "./default.repository";
import { CityModel } from "../models";
import { CityInterface } from "../../types";

class CityRepository extends DefaultRepository<CityInterface> {
  constructor() {
    super(CityModel);
  }
}

export default new CityRepository();
