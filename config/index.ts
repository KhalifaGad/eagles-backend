import dotenv from "dotenv";
dotenv.config();

export default Object.freeze({
  port: parseInt(process.env.PORT ?? "6000"),

  mongo: {
    connectionString:
      process.env.MONGO_CONNECTION_STRING ??
      "mongodb://mongodb0.example.com:27017",
  },

  jwtSecret: process.env.JWT_SECRET ?? "JWT_SECRET",
  jwtLifeTime: process.env.JWT_LIFE_TIME ?? "1y",
});
