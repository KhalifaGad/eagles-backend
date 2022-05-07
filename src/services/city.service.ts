import { cityRepository } from "../mongoDB/repositories";
import DefaultService from "./default.service";
import { CityInterface } from "../types";

class CityService extends DefaultService<CityInterface> {
  constructor() {
    super(cityRepository);
  }
}

export default new CityService();
