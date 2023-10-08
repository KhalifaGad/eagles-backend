import { NextFunction, Response, Request } from "express";
import { shipmentService } from "$services";
import { ShipmentInterface } from "$types";
import DefaultController from "./default.controller.js";

class ShipmentController extends DefaultController<ShipmentInterface> {
  constructor() {
    super(shipmentService);
    this.create = this.create.bind(this);
  }

  async create(req: Request, res: Response, next: NextFunction) {
    return this.exec(res, next, shipmentService.createShipment, req.body, req.locals?.user);
  }
}

export default new ShipmentController();
