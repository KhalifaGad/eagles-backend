import { Request, Response, NextFunction } from "express";
import { citiesService } from "../services";
import Controller from "./base.controller";

class CitiesController extends Controller {
  async create(req: Request, res: Response, next: NextFunction) {
    return this.exec(res, next, citiesService.createCity, req.body);
  }

  async list(req: Request, res: Response, next: NextFunction) {
    return this.exec(res, next, citiesService.listCities);
  }
}

export default new CitiesController();
