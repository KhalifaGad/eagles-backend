import boom from "@hapi/boom";
import { ClientService } from "../../../services";

class ClientController {
  async add(req, res, next) {
    const { address, client } = req.body;
    const branchId = req.locals.branchId;
    const clientRes = await ClientService.add(client, address, branchId);
    if (boom.isBoom(clientRes)) return next(clientRes);
    return res.status(200).send(clientRes);
  }

  async list(_req, res, next) {
    const clientsRes = await ClientService.list();
    if (boom.isBoom(clientsRes)) return next(clientsRes);
    return res.status(200).send(clientsRes);
  }
}

export default new ClientController();
