import { Request, Response, NextFunction } from "express";
import { cityService } from "../services";
import Controller from "./base.controller";

class CityController extends Controller {
  async list(req: Request, res: Response, next: NextFunction) {
    return this.exec(res, next, cityService.listCities);
  }
}

export default new CityController();
