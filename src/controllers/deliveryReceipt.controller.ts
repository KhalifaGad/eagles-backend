import { NextFunction, Response } from "express";
import DefaultController from "./default.controller";
import { deliveryReceiptService } from "../services";
import { AppRequest, DeliveryReceiptInterface } from "../types";

class DeliveryReceiptController extends DefaultController<DeliveryReceiptInterface> {
  constructor() {
    super(deliveryReceiptService);
  }

  confirm(req: AppRequest, res: Response, next: NextFunction) {
    return this.exec(res, next, deliveryReceiptService.confirm, req.body, req.locals?.user);
  }
}

export default new DeliveryReceiptController();
