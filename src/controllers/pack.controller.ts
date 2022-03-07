import { Request, Response, NextFunction } from "express";
import { packService } from "../services";
import Controller from "./base.controller";

class PackController extends Controller {
  async create(req: Request, res: Response, next: NextFunction) {
    return this.exec(res, next, packService.createPack, req.body);
  }
}

export default new PackController();
