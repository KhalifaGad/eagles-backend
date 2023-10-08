import { establishConnection, seeder } from "$infra";

const run = async () => {
  await establishConnection();
  if (process.env.NODE_ENV === "Seeding") return seeder();
};

run()
  .then(() => process.exit())
  .catch(err => {
    console.error(err);
    return process.exit(1);
  });
