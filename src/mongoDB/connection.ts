import { connect } from "mongoose";
import config from "../../config";

export default () =>
  connect(config.mongoDB.connectionString).then(() =>
    // eslint-disable-next-line no-console
    console.log(`✅ Connected to "${config.mongoDB.connectionString}" successfully`)
  );
