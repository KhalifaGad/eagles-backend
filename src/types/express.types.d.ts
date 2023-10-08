import { type AuthUser } from "./types.js";

declare module "express-serve-static-core" {
  interface Request {
    locals?: {
      user?: AuthUser;
    };
  }
}
