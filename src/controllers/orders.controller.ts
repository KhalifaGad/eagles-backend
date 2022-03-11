import { Request, Response, NextFunction } from "express";
import { ordersService } from "../services";
import Controller from "./base.controller";

class OrdersController extends Controller {
  async list(req: Request, res: Response, next: NextFunction) {
    return this.exec(res, next, ordersService.listOrders);
  }

  async create(req: Request, res: Response, next: NextFunction) {
    return this.exec(res, next, ordersService.createOrder, req.body);
  }
}

export default new OrdersController();
