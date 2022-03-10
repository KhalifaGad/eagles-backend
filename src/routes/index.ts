import { Router } from "express";
import authRouter from "./auth.router";
// import branchRouter from "./branch.router";
import cityRouter from "./city.router";
import userRouter from "./user.router";
import organizationRouter from "./organization.router";
// import employeeRouter from "./employee.router";
// import roleRouter from "./role.router";
import packRouter from "./pack.router";
import productRouter from "./product.router";
// import visitRouter from "./visit.router";
import { authenticateMiddleware, errorHandlerMiddleware } from "../middlewares";
import exceptions from "../errors";

const router = Router();

router.route("/ping").get((_, res) => res.send({ success: true }));

router.use(authenticateMiddleware);

router.use("/", authRouter);

// router.use("/", addressRouter);
// router.use("/", roleRouter);
// router.use("/", branchRouter);
// router.use("/", employeeRouter);
// router.use("/", visitRouter);
router.use("/", organizationRouter);
router.use("/", userRouter);
router.use("/", cityRouter);
router.use("/", packRouter);
router.use("/", productRouter);

router.use(errorHandlerMiddleware);

router.use((req, res, next) => next(exceptions.throwNotFound));

export default router;
