require("dotenv").config();
import { http } from "interfaces";
import { databases } from "./infra";

async function main() {
  const dbClient = await databases.Mongo.connect();
  if (!dbClient) process.exit(1);
  new http.Server(3001).init().start();
}
