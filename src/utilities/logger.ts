import { createLogger, format as winstonFormats, transports } from "winston";
import "winston-daily-rotate-file";

const format = winstonFormats.combine(
  winstonFormats.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
  winstonFormats.json(),
  winstonFormats.metadata(),
  winstonFormats.prettyPrint()
);

export default createLogger({
  transports: [
    new transports.DailyRotateFile({
      level: "error",
      filename: "logs/errors.log",
      format,
      maxSize: "1g",
      maxFiles: "1m",
    }),
    new transports.Console({
      level: "info",
      format,
    }),
  ],
});
