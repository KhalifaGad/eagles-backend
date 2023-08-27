import { AuthUser } from "./types";

declare global {
	namespace Express {
		interface Request {
			locals: {
				user: AuthUser
			};
		}
	}
}
