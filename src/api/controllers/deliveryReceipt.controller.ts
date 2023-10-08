import { NextFunction, Response, Request } from "express";
import { confirmDeliveryReceiptService, deliveryReceiptService } from "$services";
import { DeliveryReceiptInterface } from "$types";
import DefaultController from "./default.controller.js";

class DeliveryReceiptController extends DefaultController<DeliveryReceiptInterface> {
  constructor() {
    super(deliveryReceiptService);
  }

  confirm(req: Request, res: Response, next: NextFunction) {
    return this.exec(res, next, confirmDeliveryReceiptService.confirm, req.body, req.locals?.user);
  }
}

export default new DeliveryReceiptController();
