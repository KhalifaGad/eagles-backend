import { Response, NextFunction } from "express";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default class BaseController {
  protected async exec(
    res: Response,
    next: NextFunction,
    logic: (...arg: any) => any,
    ...params: any
  ) {
    try {
      return res.status(200).send(await logic(...params));
    } catch (err) {
      next(err);
    }
  }
}
