import { establishConnection } from "./mongoDB";
import Server from "./server";
import config from "../config";

export default async () => {
  try {
    await establishConnection();
    new Server(config.port).start();
  } catch (err) {
    console.error(err.message);
    return process.exit(1);
  }
};
