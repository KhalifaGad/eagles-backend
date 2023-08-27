import { Request, Response, NextFunction } from "express";
import { notFound } from "../errors";
import Service from "../services";

export default class DefaultController<T> {
  private service: Service<T>;

  constructor(service: Service<T>) {
    this.service = service;
  }

  list = async (req: Request, res: Response, next: NextFunction) => this.exec(res, next, this.service.list, req.query, req.locals?.user);

  show = async (req: Request, res: Response, next: NextFunction) =>
    this.exec(res, next, this.service.show, req.params.id, req.locals?.user);

  create = async (req: Request, res: Response, next: NextFunction) =>
    this.exec(res, next, this.service.create, req.body, req.locals?.user);

  bulkCreate = async (req: Request, res: Response, next: NextFunction) =>
    this.exec(res, next, this.service.bulkCreate, req.body, req.locals?.user);

  update = async (req: Request, res: Response, next: NextFunction) =>
    this.exec(res, next, this.service.update, req.params.id, req.body, req.locals?.user);

  delete = async (req: Request, res: Response, next: NextFunction) =>
    this.exec(res, next, this.service.delete, req.params.id, req.locals?.user);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected exec = async (res: Response, next: NextFunction, logic: (...Args: any) => any, ...args: any) => {
    try {
      const data = await logic(...args);
      if (!data) throw notFound();
      return res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  };
}
