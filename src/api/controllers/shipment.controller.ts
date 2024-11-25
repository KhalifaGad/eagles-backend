import { NextFunction, Response, Request } from "express";
import { shipmentService, createShipmentService, completeShipmentService } from "$services";
import { AuthUser, ID, ShipmentInterface } from "$types";
import DefaultController from "./default.controller.js";

class ShipmentController extends DefaultController<ShipmentInterface> {
  constructor() {
    super(shipmentService);
    this.create = this.create.bind(this);
  }

  async create(req: Request, res: Response, next: NextFunction) {
    return this.exec(res, next, createShipmentService.create, req.body, req.locals?.user);
  }

  async complete(req: Request, res: Response, next: NextFunction) {
    try {
      await completeShipmentService.complete(req.params.id as unknown as ID, req.body, req.locals?.user as AuthUser);
      return res.status(200).json({ message: "تم اتمام العملية بنجاح" });
    } catch (error) {
      next(error);
    }
  }

  async financialReport(req: Request, res: Response, next: NextFunction) {
    try {
      const filter = req.query.filter as { startDate: string; endDate: string } | undefined;
      const startDate = filter?.startDate as string;
      const endDate = filter?.endDate as string;
      const report = await shipmentService.getFinancialReport({ startDate, endDate });
      return res.status(200).json({ data: report });
    } catch (error) {
      next(error);
    }
  }
}

export default new ShipmentController();
