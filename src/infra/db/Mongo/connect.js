import { MongoClient } from "mongodb";

async function connect(url) {
  try {
    const dbClient = new MongoClient(url);
    await dbClient.connect();
    console.log("MongoDB connected");
    return dbClient;
  } catch (err) {
    console.log("Error connecting to MongoDB");
    console.log(err);
    return null;
  }
}

export default connect;
