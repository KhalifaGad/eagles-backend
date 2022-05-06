import { Response, NextFunction } from "express";

export default class BaseController {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected async exec(res: Response, next: NextFunction, logic: (...arg: any) => any, ...params: any) {
    try {
      return res.status(200).send(await logic(...params));
    } catch (err) {
      next(err);
    }
  }
}
