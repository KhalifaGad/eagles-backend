import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";
import exceptions from "../errors";

export default (
    schema: AnySchema,
    validateWhat: "body" | "query" | "params" = "body"
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      req[validateWhat] = schema.validateSync(req[validateWhat], {
        abortEarly: false,
        strict: true,
        stripUnknown: true,
      });

      next();
    } catch (err) {
      return next(
        exceptions.throwBadRequest(
          err.errors.map((message: string) => message).join(" & ")
        )
      );
    }
  };
