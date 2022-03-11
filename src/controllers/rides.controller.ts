import { Request, Response, NextFunction } from "express";
import { ridesService } from "../services";
import Controller from "./base.controller";

class RidesController extends Controller {
  async list(req: Request, res: Response, next: NextFunction) {
    return this.exec(res, next, ridesService.listRides);
  }

  async create(req: Request, res: Response, next: NextFunction) {
    return this.exec(res, next, ridesService.createRide, req.body);
  }
}

export default new RidesController();
