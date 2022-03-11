import { Request, Response, NextFunction } from "express";
import { organizationsService } from "../services";
import Controller from "./base.controller";

class OrganizationsController extends Controller {
  async list(req: Request, res: Response, next: NextFunction) {
    return this.exec(res, next, organizationsService.listOrganizations);
  }

  async show(req: Request, res: Response, next: NextFunction) {
    return this.exec(res, next, organizationsService.showOrganization);
  }

  async create(req: Request, res: Response, next: NextFunction) {
    return this.exec(
      res,
      next,
      organizationsService.createOrganization,
      req.body
    );
  }

  async addBranch(req: Request, res: Response, next: NextFunction) {
    return this.exec(res, next, organizationsService.createBranch, {
      ...req.body,
      organizationId: req.params.organizationId,
    });
  }
}

export default new OrganizationsController();
