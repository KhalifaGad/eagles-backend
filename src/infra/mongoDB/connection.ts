import config from "$config";
import { logger } from "$utils";
import mongoose from "mongoose";

process.on("SIGINT", () => {
  mongoose.connection
    .close()
    .then(() => {
      logger.info("Mongoose disconnected through app termination");
      return process.exit(0);
    })
    .catch(err => {
      logger.error("Mongoose disconnected through app termination", { err });
      process.exit(1);
    });
});

mongoose.connection.on("error", err => {
  logger.error("MongoDB connection error:", { err });
});

export default () =>
  mongoose
    .connect(config.mongoDB.uri, {
      dbName: config.mongoDB.database,
      pass: config.mongoDB.password,
      user: config.mongoDB.username,
      maxPoolSize: 100,
    })
    .then(() => {
      return logger.info(`✅ Connected to database: "${config.mongoDB.database}" successfully`);
    });
