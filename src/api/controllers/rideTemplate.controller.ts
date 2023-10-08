import { NextFunction, Response, Request } from "express";
import { rideTemplateService } from "$services";
import { RideTemplateInterface } from "$types";
import DefaultController from "./default.controller.js";

class RideTemplateController extends DefaultController<RideTemplateInterface> {
  constructor() {
    super(rideTemplateService);
  }

  async create(req: Request, res: Response, next: NextFunction) {
    return this.exec(res, next, rideTemplateService.createTemplate, req.body, req.locals?.user);
  }
}

export default new RideTemplateController();
