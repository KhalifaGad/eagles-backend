import { Request, Response, NextFunction } from "express";
import { productsService } from "../services";
import Controller from "./base.controller";

class ProductsController extends Controller {
  async list(req: Request, res: Response, next: NextFunction) {
    return this.exec(res, next, productsService.listProducts);
  }

  async create(req: Request, res: Response, next: NextFunction) {
    return this.exec(res, next, productsService.createProduct, req.body);
  }
}

export default new ProductsController();
