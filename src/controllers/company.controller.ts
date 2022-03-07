import { Request, Response, NextFunction } from "express";
import { companyService } from "../services";
import Controller from "./base.controller";

class CompanyController extends Controller {
  async list(req: Request, res: Response, next: NextFunction) {
    return this.exec(res, next, companyService.listCompanies);
  }

  async create(req: Request, res: Response, next: NextFunction) {
    return this.exec(res, next, companyService.createCompany, req.body);
  }
}

export default new CompanyController();
