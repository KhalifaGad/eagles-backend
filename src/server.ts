import cors from "cors";
import express, { Express } from "express";
import helmet from "helmet";
import { apiRoutes } from "./api/index.js";
import { logger } from "./utilities/index.js";

class Server {
  private server: Express;

  constructor(private port: number) {
    this.server = express().use(helmet()).use(cors()).use(express.json());
    this.server.use("/api", apiRoutes);
  }

  start() {
    this.server.listen(this.port, () => logger.info(`🚀 Server started on port: ${this.port}`));
  }
}

export default Server;
