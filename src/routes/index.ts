import { Router } from "express";
import authRouter from "./auth.router";
import citiesRouter from "./cities.router";
import ordersRouter from "./orders.router";
import organizationsRouter from "./organizations.router";
import productsRouter from "./products.router";
import ridesRouter from "./rides.router";
import rolesRouter from "./roles.router";
import usersRouter from "./users.router";
import vehiclesRouter from "./vehicles.router";
import { authenticateMiddleware, errorHandlerMiddleware } from "../middlewares";
import exceptions from "../errors";

const router = Router();

router.route("/ping").get((_req, res) => res.send({ success: true }));

router.use(authenticateMiddleware);

router.use("/", authRouter);
router.use("/", citiesRouter);
router.use("/", ordersRouter);
router.use("/", organizationsRouter);
router.use("/", productsRouter);
router.use("/", ridesRouter);
router.use("/", rolesRouter);
router.use("/", usersRouter);
router.use("/", vehiclesRouter);

router.use(errorHandlerMiddleware);

router.use((_req, _res, next) => next(exceptions.throwNotFound));

export default router;
