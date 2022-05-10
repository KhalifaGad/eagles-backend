import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { unauthorized } from "../errors";
import config from "../../config";

export default (req: Request, _res: Response, next: NextFunction) => {
  try {
    const token = (req.headers.authorization ?? "").replace("Bearer ", "");

    verify(token, config.jwtSecret, (err, data) => {
      if (err || !data) throw unauthorized();

      req.client = data;
    });
  } catch (err) {
    next(err);
  }

  next();
};
