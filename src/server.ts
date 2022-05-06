import cors from "cors";
import helmet from "helmet";
import express from "express";
import routes from "./routes";

class Server {
  private port: number;
  private server;

  constructor(port: number) {
    this.port = port;
    this.server = express().use(helmet()).use(cors()).use(express.json());
    this.server.use("/api", routes);
  }

  start() {
    // eslint-disable-next-line no-console
    this.server.listen(this.port, () => console.log(`🚀 Server started on port: ${this.port}`));
  }
}

export default Server;
