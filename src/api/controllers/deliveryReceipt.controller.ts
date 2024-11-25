import { createDeliveryReceiptService, confirmDeliveryReceiptService, deliveryReceiptService } from "$services";
import { DeliveryReceiptInterface } from "$types";
import { NextFunction, Request, Response } from "express";
import DefaultController from "./default.controller.js";

class DeliveryReceiptController extends DefaultController<DeliveryReceiptInterface> {
  constructor() {
    super(deliveryReceiptService);
    this.confirm = this.confirm.bind(this);
  }

  confirm(req: Request, res: Response, next: NextFunction) {
    return this.exec(res, next, confirmDeliveryReceiptService.confirm, req.params.id, req.locals?.user);
  }

  create(req: Request, res: Response, next: NextFunction) {
    return this.exec(res, next, createDeliveryReceiptService.create, req.body, req.locals?.user);
  }
}

export default new DeliveryReceiptController();
