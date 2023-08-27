import { NextFunction, Response } from "express";
import DefaultController from "./default.controller";
import { rideTemplateService } from "../services";
import { AppRequest, RideTemplateInterface } from "../types";

class RideTemplateController extends DefaultController<RideTemplateInterface> {
  constructor() {
    super(rideTemplateService);
  }

  async create(req: AppRequest, res: Response, next: NextFunction) {
    return this.exec(res, next, rideTemplateService.createTemplate, req.body, req.locals?.user);
  }
}

export default new RideTemplateController();
