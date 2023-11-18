import { createLogger, format as winstonFormats, transports } from "winston";

const format = winstonFormats.combine(
  winstonFormats.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
  winstonFormats.json(),
  winstonFormats.metadata(),
  winstonFormats.prettyPrint()
);

export default createLogger({
  transports: [
    new transports.File({
      level: "error",
      filename: "logs/errors.log",
      format,
    }),
    new transports.Console({
      level: "info",
      format,
    }),
  ],
});
