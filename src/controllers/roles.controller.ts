import { Request, Response, NextFunction } from "express";
import { rolesService } from "../services";
import Controller from "./base.controller";

class RolesController extends Controller {
  async list(req: Request, res: Response, next: NextFunction) {
    return this.exec(res, next, rolesService.listRoles);
  }

  async create(req: Request, res: Response, next: NextFunction) {
    return this.exec(res, next, rolesService.createRole, req.body);
  }
}

export default new RolesController();
