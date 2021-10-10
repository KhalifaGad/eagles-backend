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
}

export default new ClientController();
