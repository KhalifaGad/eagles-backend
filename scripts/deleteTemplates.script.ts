import { deleteSeed, establishConnection } from "../src/mongoDB";

const run = async () => {
	await establishConnection();
	if (process.env.NODE_ENV === "Seeding") return deleteSeed();
};

run()
	.then(() => process.exit())
	.catch(err => {
		console.error(err);
		return process.exit(1);
	});
