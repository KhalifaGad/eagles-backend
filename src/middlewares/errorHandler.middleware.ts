import { Request, Response, NextFunction } from "express";
import { isBoom, Boom } from "@hapi/boom";
import { MongoError } from "mongodb";
import { logger } from "../utilities";
import { badData } from "../errors";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (error: Boom | MongoError | Error, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof MongoError && error.code === 11000) {
    error = badData(
      `${error.message
        .split("index: ")[1]
        .split("_")[0]
        .split("")
        .map(char => (/[A-Z]/.test(char) ? ` ${char.toLowerCase()}` : char))
        .join("")} already exist`
    );
  }

  if (isBoom(error)) {
    return res.status(error.output.payload.statusCode).send(error.output.payload);
  }

  logger.error(error.message);

  return res.status(500).send({
    statusCode: 500,
    error: "Internal Server Error",
    message: "Something went wrong! please try again later",
  });
};
