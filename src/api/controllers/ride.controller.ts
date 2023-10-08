import { NextFunction, Response, Request } from "express";
import { rideService } from "$services";
import { RideInterface } from "$types";
import DefaultController from "./default.controller.js";

class RideController extends DefaultController<RideInterface> {
  constructor() {
    super(rideService);
    this.create = this.create.bind(this);
  }

  async create(req: Request, res: Response, next: NextFunction) {
    return this.exec(res, next, rideService.createRide, req.body, req.locals?.user);
  }
}

export default new RideController();
