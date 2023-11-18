import { config } from "dotenv";

config();

export default Object.freeze({
  port: parseInt(process.env.PORT || "5000"),

  mongoDB: {
    uri: process.env.MONGODB_URI ?? "",
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    username: process.env.DATABASE_USERNAME,
  },

  jwtSecret: process.env.COOKIE_SECRET || "JWT_SECRET",
  jwtLifeTime: process.env.JWT_LIFE_TIME || "1y",
});
