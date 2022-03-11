import { Request, Response, NextFunction } from "express";
import { usersService } from "../services";
import Controller from "./base.controller";

class UsersController extends Controller {
  async list(req: Request, res: Response, next: NextFunction) {
    return this.exec(res, next, usersService.listUsers);
  }

  async create(req: Request, res: Response, next: NextFunction) {
    return this.exec(res, next, usersService.createUser, req.body);
  }
}

export default new UsersController();
