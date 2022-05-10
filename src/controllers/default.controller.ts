import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import Service from "../services";
import { notFound } from "../errors";

export default class DefaultController<T> {
  private service: Service<T>;

  constructor(service: Service<T>) {
    this.service = service;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected exec = async (res: Response, next: NextFunction, logic: (...arg: any) => any, ...params: any) => {
    try {
      const data = await logic(...params);
      if (!data) throw notFound();
      return res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private queryParamsHandler = (queryParams: any) => {
    const handledQueryParams = {};
    Object.keys(queryParams).forEach(key => {
      try {
        Object.assign(handledQueryParams, { [key]: JSON.parse(queryParams[key]) });
      } catch {
        Object.assign(handledQueryParams, { [key]: queryParams[key] });
      }
    });
    return handledQueryParams;
  };

  private idHandler = (id: string, next: NextFunction) => {
    try {
      return new Types.ObjectId(id);
    } catch (err) {
      next(err);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction) => {
    return this.exec(res, next, this.service.list, this.queryParamsHandler(req.query));
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    return this.exec(res, next, this.service.show, this.idHandler(req.params.id, next));
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    return this.exec(res, next, this.service.create, req.body);
  };

  bulkCreate = async (req: Request, res: Response, next: NextFunction) => {
    return this.exec(res, next, this.service.bulkCreate, req.body);
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    return this.exec(res, next, this.service.update, this.idHandler(req.params.id, next), req.body);
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    return this.exec(res, next, this.service.delete, this.idHandler(req.params.id, next));
  };
}
