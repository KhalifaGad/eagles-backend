import { Request, Response, NextFunction } from "express";
import { organizationService } from "../services";
import Controller from "./base.controller";

class organizationController extends Controller {
  async list(req: Request, res: Response, next: NextFunction) {
    return this.exec(res, next, organizationService.listCompanies);
  }

  async create(req: Request, res: Response, next: NextFunction) {
    return this.exec(
      res,
      next,
      organizationService.createorganization,
      req.body
    );
  }
}

export default new organizationController();
