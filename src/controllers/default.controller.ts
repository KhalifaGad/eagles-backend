import { Response, NextFunction } from "express";
import { AppRequest } from "../types";
import { notFound } from "../errors";
import Service from "../services";

export default class DefaultController<T> {
  private service: Service<T>;

  constructor(service: Service<T>) {
    this.service = service;
    this.list = this.list.bind(this);
    this.exec = this.exec.bind(this);
    this.create = this.create.bind(this);
    this.bulkCreate = this.bulkCreate.bind(this);
    this.update = this.update.bind(this);
    this.show = this.show.bind(this);
    this.delete = this.delete.bind(this);
  }

  async list(req: AppRequest, res: Response, next: NextFunction) {
    return this.exec(res, next, this.service.list, req.query, req.locals?.user);
  }

  async show(req: AppRequest, res: Response, next: NextFunction) {
    return this.exec(res, next, this.service.show, req.params.id, req.locals?.user);
  }

  async create(req: AppRequest, res: Response, next: NextFunction) {
    return this.exec(res, next, this.service.create, req.body, req.locals?.user);
  }

  async bulkCreate(req: AppRequest, res: Response, next: NextFunction) {
    return this.exec(res, next, this.service.bulkCreate, req.body, req.locals?.user);
  }

  async update(req: AppRequest, res: Response, next: NextFunction) {
    return this.exec(res, next, this.service.update, req.params.id, req.body, req.locals?.user);
  }

  async delete(req: AppRequest, res: Response, next: NextFunction) {
    return this.exec(res, next, this.service.delete, req.params.id, req.locals?.user);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected async exec(res: Response, next: NextFunction, logic: (...Args: any) => any, ...args: any) {
    try {
      const data = await logic(...args);
      if (!data) throw notFound();
      return res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  }
}
