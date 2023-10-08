import { connect } from "mongoose";
import config from "$config";
import { logger } from "$utils";

export default () =>
  connect(config.mongoDB.connectionString).then(() =>
    logger.info(`✅ Connected to "${config.mongoDB.connectionString}" successfully`)
  );
