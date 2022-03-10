import Repository from "./baseRepository";
import { cityModel } from "../schemas";
import { CityInterface } from "../../types";

class CitiesRepository extends Repository<CityInterface> {
  constructor() {
    super(cityModel);
  }
}

export default new CitiesRepository();
