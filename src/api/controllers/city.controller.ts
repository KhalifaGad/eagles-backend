import { cityService } from "$services";
import { CityInterface } from "$types";
import DefaultController from "./default.controller.js";

class CityController extends DefaultController<CityInterface> {
  constructor() {
    super(cityService);
  }
}

export default new CityController();
