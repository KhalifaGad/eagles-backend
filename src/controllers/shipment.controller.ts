import { NextFunction, Request, Response } from "express";
import DefaultController from "./default.controller";
import { shipmentService } from "../services";
import { ShipmentInterface } from "../types";

class ShipmentController extends DefaultController<ShipmentInterface> {
  constructor() {
    super(shipmentService);
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    return this.exec(res, next, shipmentService.createShipment, req.body, req.locals?.user);
  };
}

export default new ShipmentController();
