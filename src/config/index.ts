import { config } from "dotenv";

config();

export default Object.freeze({
  port: parseInt(process.env.PORT || "5000"),

  mongoDB: {
    connectionString: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/egypt-eagles",
  },

  jwtSecret: process.env.COOKIE_SECRET || "JWT_SECRET",
  jwtLifeTime: process.env.JWT_LIFE_TIME || "1y",
});
