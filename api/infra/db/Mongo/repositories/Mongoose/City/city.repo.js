import BaseRepo from "../baseRepo";
import Model from "./city.model";

class CityRepo extends BaseRepo {
  constructor() {
    super(Model);
  }
}

export default new CityRepo();
