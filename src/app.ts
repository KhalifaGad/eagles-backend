import config from "./config/index.js";
import { establishConnection } from "./infra/index.js";
import Server from "./server.js";

export default async () => {
  try {
    await establishConnection();
    new Server(config.port).start();
  } catch (err: any) {
    console.error(err.message);
    return process.exit(1);
  }
};
