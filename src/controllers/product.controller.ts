import { Request, Response, NextFunction } from "express";
import { productService } from "../services";
import Controller from "./base.controller";

class ProductController extends Controller {
  async list(req: Request, res: Response, next: NextFunction) {
    return this.exec(res, next, productService.listProducts);
  }

  async create(req: Request, res: Response, next: NextFunction) {
    return this.exec(res, next, productService.createProduct, req.body);
  }
}

export default new ProductController();
