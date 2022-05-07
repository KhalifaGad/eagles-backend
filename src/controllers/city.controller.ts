import DefaultController from "./default.controller";
import { cityService } from "../services";
import { CityInterface } from "../types";

class CityController extends DefaultController<CityInterface> {
  constructor() {
    super(cityService);
  }
}

export default new CityController();
