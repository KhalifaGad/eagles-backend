import { config } from "dotenv";
config();

export default Object.freeze({
  port: parseInt(process.env.PORT ?? "6000"),

  mongo: {
    connectionString:
      process.env.MONGO_CONNECTION_STRING ??
      "mongodb://127.0.0.1:27017/egypt-eagles",
  },

  jwtSecret: process.env.JWT_SECRET ?? "JWT_SECRET",
  jwtLifeTime: process.env.JWT_LIFE_TIME ?? "1y",
});
