import { establishConnection } from "./mongo";
import Server from "./server";
import config from "../config";

/* eslint-disable no-console */

export default async () => {
  try {
    await establishConnection();
    new Server(config.port).start();
  } catch (err) {
    console.error(`${err.message}`);
  }
};
