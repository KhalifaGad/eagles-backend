import { CityService } from "../../../services";
import boom from "@hapi/boom";

class CityController {
  async list(_req, res, next) {
    const citiesRes = await CityService.list();
    if (boom.isBoom(citiesRes)) return next(citiesRes);
    return res.status(200).send(citiesRes);
  }
}

export default new CityController();
