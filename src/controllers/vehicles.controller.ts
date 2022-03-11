import { Request, Response, NextFunction } from "express";
import { vehiclesService } from "../services";
import Controller from "./base.controller";

class VehiclesController extends Controller {
  async list(req: Request, res: Response, next: NextFunction) {
    return this.exec(res, next, vehiclesService.listVehicles);
  }

  async create(req: Request, res: Response, next: NextFunction) {
    return this.exec(res, next, vehiclesService.createVehicle, req.body);
  }
}

export default new VehiclesController();
