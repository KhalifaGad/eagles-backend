import { NextFunction, Request, Response } from "express";
import { badRequest } from "$errors";
import * as yup from "yup";

export default (schema: yup.AnySchema, validateWhat: "body" | "query" | "params" = "body") =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      req[validateWhat] = (Array.isArray(req[validateWhat]) ? yup.array().of(schema).min(2) : schema).validateSync(
        req[validateWhat],
        {
          strict: true,
          abortEarly: false,
          stripUnknown: true,
        }
      );

      next();
    } catch (err: any) {
      next(badRequest(err.errors.map((message: string) => message).join(" & ")));
    }
  };
