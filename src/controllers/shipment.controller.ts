import { NextFunction, Response } from "express";
import DefaultController from "./default.controller";
import { shipmentService } from "../services";
import { AppRequest, ShipmentInterface } from "../types";

class ShipmentController extends DefaultController<ShipmentInterface> {
  constructor() {
    super(shipmentService);
    this.create = this.create.bind(this);
  }

  async create(req: AppRequest, res: Response, next: NextFunction) {
    return this.exec(res, next, shipmentService.createShipment, req.body, req.locals?.user);
  }
}

export default new ShipmentController();
