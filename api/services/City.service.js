import { repositories as repos } from "../infra/db/Mongo";
import ErrorService from "./Error.service";

class CityService {
  async list() {
    try {
      return await repos.City.list();
    } catch (err) {
      return ErrorService.handleError(err);
    }
  }
}

export default new CityService();
