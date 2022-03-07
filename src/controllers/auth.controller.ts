import { Request, Response, NextFunction } from "express";
import { authService } from "../services";
import Controller from "./base.controller";

class AuthController extends Controller {
  async login(req: Request, res: Response, next: NextFunction) {
    return this.exec(res, next, authService.login, req.body);
  }
}

export default new AuthController();
