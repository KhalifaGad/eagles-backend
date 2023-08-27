import { AuthUser } from "./types";
import { Request } from "express";

export interface AppRequest extends Request {
  locals: {
    user: AuthUser;
  };
}
