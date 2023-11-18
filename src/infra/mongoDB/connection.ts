import config from "$config";
import { logger } from "$utils";
import mongoose from "mongoose";

export default () =>
  mongoose
    .connect(config.mongoDB.uri, {
      dbName: config.mongoDB.database,
      pass: config.mongoDB.password,
      user: config.mongoDB.username,
    })
    .then(() => {
      process.on("SIGINT", () => {
        mongoose.connection.close(() => {
          logger.info("Mongoose disconnected through app termination");
          process.exit(0);
        });
      });
      return logger.info(`✅ Connected to database: "${config.mongoDB.database}" successfully`);
    });
