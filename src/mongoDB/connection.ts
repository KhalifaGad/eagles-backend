import { connect } from "mongoose";
import config from "../../config";

export default () =>
  // eslint-disable-next-line no-console
  connect(config.mongoDB.connectionString).then(() => console.log(`Connected to ${config.mongoDB.connectionString}`));
