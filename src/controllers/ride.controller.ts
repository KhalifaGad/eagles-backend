import { NextFunction, Response } from "express";
import DefaultController from "./default.controller";
import { rideService } from "../services";
import { AppRequest, RideInterface } from "../types";

class RideController extends DefaultController<RideInterface> {
  constructor() {
    super(rideService);
    this.create = this.create.bind(this);
  }

  async create(req: AppRequest, res: Response, next: NextFunction) {
    return this.exec(res, next, rideService.createRide, req.body, req.locals?.user);
  }

}

export default new RideController();
