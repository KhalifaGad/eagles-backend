import { Request, Response, NextFunction } from "express";
import DefaultController from "./default.controller";
import { authenticationService } from "../services";
import { CredentialInterface } from "../types";

class AuthenticationController extends DefaultController<CredentialInterface> {
  constructor() {
    super(authenticationService);
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    return this.exec(res, next, authenticationService.login, req.body);
  };
}

export default new AuthenticationController();
