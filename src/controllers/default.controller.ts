import { Request, Response, NextFunction } from "express";
import Service from "../services";

export default class DefaultController<T> {
  private service: Service<T>;

  constructor(service: Service<T>) {
    this.service = service;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected async exec(res: Response, next: NextFunction, logic: (...arg: any) => any, ...params: any) {
    try {
      return res.status(200).send(await logic(...params));
    } catch (err) {
      next(err);
    }
  }

  async list(_req: Request, res: Response, next: NextFunction) {
    return this.exec(res, next, this.service.list);
  }

  async show(req: Request, res: Response, next: NextFunction) {
    return this.exec(res, next, this.service.list, req.params.id);
  }

  async create(req: Request, res: Response, next: NextFunction) {
    return this.exec(res, next, this.service.create, req.body);
  }

  async update(req: Request, res: Response, next: NextFunction) {
    return this.exec(res, next, this.service.update, req.params.id, req.body);
  }
}
