import boom from "@hapi/boom";
import { CompanyService } from "../../../services";

class ClientController {
  async add(req, res, next) {
    const { company, managers, address } = req.body;
    const branchId = req.locals.branchId;
    const companyRes = await CompanyService.add(
      company,
      address,
      managers,
      branchId
    );
    if (boom.isBoom(companyRes)) return next(companyRes);
    return res.status(201).send(companyRes);
  }

  async list(_req, res, next) {
    const companiesRes = await CompanyService.list();
    if (boom.isBoom(companiesRes)) return next(companiesRes);
    return res.status(200).send(companiesRes);
  }
}

export default new ClientController();
