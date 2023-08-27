import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AuthUser } from "../types";
import config from "../../config";
import { forbidden } from "../errors";

export default (req: Request, _res: Response, next: NextFunction) => {
  try {
    const token = (req.headers.authorization ?? "").replace("Bearer ", "");

    verify(token, config.jwtSecret, (err, data) => {
      if (err || !data) throw forbidden();

      req.locals.user = data as AuthUser;
    });
  } catch (err) {
    next(err);
  }

  next();
};
