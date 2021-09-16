require("dotenv").config();
import { http } from "./interfaces";
import { databases } from "./infra";

async function main() {
  await databases.Mongo.connect(process.env.MONGODB_URI, true);
  new http.Server(3032).init().start();
}

async function seedDB() {
  await databases.Mongo.seeder.seed();
}

(async () => {
  try {
    await main();
    await seedDB();
  } catch (err) {
    console.log(err);
  }
})();
