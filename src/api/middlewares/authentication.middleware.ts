import config from "$config";
import { forbidden } from "$errors";
import { AuthUser } from "$types";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default (req: Request, _res: Response, next: NextFunction) => {
  try {
    const token = (req.headers.authorization ?? "").replace("Bearer ", "");

    jwt.verify(token, config.jwtSecret, (err, data) => {
      if (err || !data) throw forbidden();

      req.locals = { user: data as AuthUser };
    });
  } catch (err) {
    next(err);
  }

  next();
};
