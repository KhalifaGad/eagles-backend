import Repository from "./baseRepository";
import { cityModel, CityDocument } from "../schemas";

class CityRepository extends Repository<CityDocument> {
  constructor() {
    super(cityModel);
  }
}

export default new CityRepository();
