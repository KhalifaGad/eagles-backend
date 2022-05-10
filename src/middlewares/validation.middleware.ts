import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";
import { badRequest } from "../errors";

export default (schema: AnySchema, validateWhat: "body" | "query" | "params" = "body") =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      req[validateWhat] = schema.validateSync(req[validateWhat], {
        abortEarly: false,
        strict: true,
        stripUnknown: true,
      });

      next();
    } catch (err) {
      next(badRequest(err.errors.map((message: string) => message).join(" & ")));
    }
  };
