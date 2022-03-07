import { Request, Response, NextFunction } from "express";
import { isBoom } from "@hapi/boom";
import { logger } from "../utilities";

/* eslint-disable @typescript-eslint/no-unused-vars */

export default (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (isBoom(err)) {
    return res.status(err.output.payload.statusCode).send(err.output.payload);
  }

  // TODO: Database errors handling

  logger.error(err.message);

  return res.status(500).send({
    statusCode: 500,
    error: "Internal Server Error",
    message: "Oops! Something went wrong!",
  });
};
