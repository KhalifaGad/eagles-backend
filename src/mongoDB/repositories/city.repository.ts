import Repository from "./baseRepository";
import { CityModel } from "../models";
import { CityInterface } from "../../types";

class CityRepository extends Repository<CityInterface> {
  constructor() {
    super(CityModel);
  }
}

export default new CityRepository();
