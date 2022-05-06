import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import exceptions from "../errors";
import config from "../../config";

export default () => (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) return next(exceptions.throwUnauthorized());

  jwt.verify(token, config.jwtSecret, async (err, data) => {
    if (err) return next(exceptions.throwUnauthorized());

    // TODO
    // res.user = data;
  });

  next();
};
