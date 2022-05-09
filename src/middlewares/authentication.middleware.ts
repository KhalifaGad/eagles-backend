import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import exceptions from "../errors";
import config from "../../config";

export default (req: Request, _res: Response, next: NextFunction) => {
  try {
    const token = (req.headers.authorization ?? "").replace("Bearer ", "");

    verify(token, config.jwtSecret, (err, data) => {
      if (err || !data) throw new Error();

      req.client = data;
    });
  } catch (err) {
    next(exceptions.throwUnauthorized());
  }

  next();
};
