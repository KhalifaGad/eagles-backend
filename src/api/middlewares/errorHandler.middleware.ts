import { Boom, isBoom } from "@hapi/boom";
import { NextFunction, Request, Response } from "express";
import { MongoError } from "mongodb";
import { badData } from "$errors";
import { logger } from "$utils";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (error: Boom | MongoError | Error, _req: Request, res: Response, _next: NextFunction) => {
  logger.error(error.message, error);
  if (error instanceof MongoError && error.code === 11000) {
    error = badData(
      `${error.message
        .split("index: ")[1]
        .split("_")[0]
        .split("")
        .map(char => (/[A-Z]/.test(char) ? ` ${char.toLowerCase()}` : char))
        .join("")} موجود مسبقا`
    );
  }

  if (isBoom(error)) {
    return res.status(error.output.payload.statusCode).send(error.output.payload);
  }

  return res.status(500).send({
    statusCode: 500,
    error: "Internal Server Error",
    message: "Something went wrong! please try again later",
  });
};
