import { NextFunction, Request, Response } from "express";
import DefaultController from "./default.controller";
import { companyService } from "../services";
import { CompanyInterface } from "../types";

class CompanyController extends DefaultController<CompanyInterface> {
  constructor() {
    super(companyService);
  }

  update = async (req: Request, res: Response, next: NextFunction) =>
    this.exec(res, next, companyService.updateCompany, req.params.id, req.body);
}

export default new CompanyController();
