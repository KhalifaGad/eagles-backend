import { connect } from "mongoose";
import config from "../../config";

export default () => connect(config.mongo.connectionString);
