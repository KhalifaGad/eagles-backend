// import { MongoConnect } from "./src/infra/mongo";
import Server from "./server";
import config from "../config";

/* eslint-disable no-console */

export default () => {
  try {
    new Server(config.port).start();
  } catch (err) {
    console.error(`${err.message}`);
  }
};
