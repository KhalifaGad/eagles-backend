import { Request, Response, NextFunction } from "express";
import Service from "../services";

export default class DefaultController<T> {
  private service: Service<T>;

  constructor(service: Service<T>) {
    this.service = service;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected exec = async (res: Response, next: NextFunction, logic: (...arg: any) => any, ...params: any) => {
    try {
      return res.status(200).send(await logic(...params));
    } catch (err) {
      next(err);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction) => {
    return this.exec(res, next, this.service.list, req.query);
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    return this.exec(res, next, this.service.show, req.params.id);
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    return this.exec(res, next, this.service.create, req.body);
  };

  bulkCreate = async (req: Request, res: Response, next: NextFunction) => {
    return this.exec(res, next, this.service.bulkCreate, req.body);
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    return this.exec(res, next, this.service.update, req.params.id, req.body);
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    return this.exec(res, next, this.service.delete, req.params.id);
  };
}
