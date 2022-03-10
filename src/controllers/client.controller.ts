import { Request, Response, NextFunction } from "express";
import { userService } from "../services";
import Controller from "./base.controller";

class userController extends Controller {
  async list(req: Request, res: Response, next: NextFunction) {
    return this.exec(res, next, userService.listusers);
  }

  async create(req: Request, res: Response, next: NextFunction) {
    return this.exec(res, next, userService.createuser, req.body);
  }
}

export default new userController();
