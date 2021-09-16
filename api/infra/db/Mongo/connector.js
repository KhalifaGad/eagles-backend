import mongoose from "mongoose";

async function connect(url) {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

async function close(client) {
  try {
    await client.close();
    return;
  } catch (err) {
    console.log(error);
  }
}

export { connect, close };
