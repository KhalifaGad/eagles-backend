import { Router } from "express";
import addressRouter from "./address.router";
import authenticationRouter from "./authentication.router";
import branchRouter from "./branch.router";
import cityRouter from "./city.router";
import clientRouter from "./client.router";
import companyRouter from "./company.router";
import employeeRouter from "./employee.router";
import packRouter from "./pack.router";
import productRouter from "./product.router";
import roleRouter from "./role.router";
import visitRouter from "./visit.router";

const router = new Router();

router.use("/authentication", authenticationRouter);
router.use("/branches", branchRouter);
router.use("/employees", employeeRouter);
router.use("/visits", visitRouter);
router.use("/companies", companyRouter);
router.use("/clients", clientRouter);
router.use("/addresses", addressRouter);
router.use("/roles", roleRouter);
router.use("/cities", cityRouter);
router.use("/packs", packRouter);
router.use("/products", productRouter);

export default router;
