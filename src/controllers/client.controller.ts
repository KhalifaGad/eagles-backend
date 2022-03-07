import { Request, Response, NextFunction } from "express";
import { clientService } from "../services";
import Controller from "./base.controller";

class ClientController extends Controller {
  async list(req: Request, res: Response, next: NextFunction) {
    return this.exec(res, next, clientService.listClients);
  }

  async create(req: Request, res: Response, next: NextFunction) {
    return this.exec(res, next, clientService.createClient, req.body);
  }
}

export default new ClientController();
