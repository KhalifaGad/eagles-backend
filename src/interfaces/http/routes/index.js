import { Router } from "express";

const router = new Router();

router.use("/authentication");
router.use("/branches");
router.use("/employees");
router.use("/visits");
router.use("/companies");
router.use("/clients");
router.use("/addresses");
router.use("/roles");
router.use("/cities");
router.use("/packs");
router.use("/products");

export default router;
