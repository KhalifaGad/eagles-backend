import { ProductService } from "../../../services";
import boom from "@hapi/boom";

class ProductController {
  async list(_req, res, next) {
    const productRes = await ProductService.list();
    if (boom.isBoom(productRes)) return next(productRes);
    return res.status(200).send(productRes);
  }

  async add(req, res, next) {
    const productRes = await ProductService.add(req.body, req.locals.branchId);
    if (boom.isBoom(productRes)) return next(productRes);
    return res.status(201).send(productRes);
  }
}

export default new ProductController();
