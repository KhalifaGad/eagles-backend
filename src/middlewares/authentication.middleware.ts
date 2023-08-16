import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import config from "../../config";
import { forbidden } from "../errors";

export default (req: Request, _res: Response, next: NextFunction) => {
	try {
		const token = (req.headers.authorization ?? "").replace("Bearer ", "");

		verify(token, config.jwtSecret, (err, data) => {
			if (err || !data) throw forbidden();

			req.client = data;
		});
	} catch (err) {
		next(err);
	}

	next();
};
