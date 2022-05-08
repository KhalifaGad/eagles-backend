import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import exceptions from "../errors";
import config from "../../config";

export default (req: Request, _res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) return next(exceptions.throwUnauthorized());

  jwt.verify(token, config.jwtSecret, async (err, data) => {
    if (err || !data) return next(exceptions.throwUnauthorized());

    req.client = data;
  });

  next();
};
