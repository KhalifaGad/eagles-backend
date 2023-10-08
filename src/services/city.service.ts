import { cityRepository } from "$infra";
import { CityInterface } from "$types";
import DefaultService from "./default.service.js";

class CityService extends DefaultService<CityInterface> {
  constructor() {
    super(cityRepository);
  }
}

export default new CityService();
