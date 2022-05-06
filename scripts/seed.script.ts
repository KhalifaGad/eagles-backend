import { establishConnection, seeder } from "../src/mongoDB";

const run = async () => {
  await establishConnection();
  await seeder();
};

run()
  .then(() => process.exit())
  .catch(err => {
    console.error(err);
    return process.exit(1);
  });
