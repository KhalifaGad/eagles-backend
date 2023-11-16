import { createLogger, format as winstonFormat, transports } from "winston";

const format = winstonFormat.combine(
  winstonFormat.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
  winstonFormat.printf(info => {
    return `${info.level}-${[info.timestamp]}: ${info.message}, ${info.meta || ""}, ${info.stack || ""}`;
  }),
  winstonFormat.json()
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
