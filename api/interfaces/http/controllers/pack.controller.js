import boom from "@hapi/boom";
import { PackService } from "../../../services";

class ClientController {
  async add(req, res, next) {
    const data = req.body;
    const branchId = req.locals.branchId;
    const packRes = await PackService.add(data, branchId);
    if (boom.isBoom(packRes)) return next(packRes);
    return res.status(201).send(packRes);
  }
}

export default new ClientController();
