import { Router } from "express";
import {
  authenticateMiddleware,
  errorHandlerMiddleware,
  queryParamsMiddleware,
  validateMiddleware,
} from "../middlewares/index.js";
import { queryParamsSchema } from "../validations/index.js";
import agencyRoutes from "./agency.routes.js";
import authenticationRoutes from "./authentication.routes.js";
import cityRoutes from "./city.routes.js";
import clientRoutes from "./client.routes.js";
import companyRoutes from "./company.routes.js";
import deliveryReceiptRoutes from "./deliveryReceipt.routes.js";
import employeeRoutes from "./employee.routes.js";
import employeeRatingRoutes from "./employeeRating.routes.js";
import hubRoutes from "./hub.routes.js";
import rideRoutes from "./ride.routes.js";
import rideTemplateRoutes from "./rideTemplate.routes.js";
import salaryRoutes from "./salary.routes.js";
import shipmentRoutes from "./shipment.routes.js";
import vehicleRoutes from "./vehicle.routes.js";

const router = Router().use(queryParamsMiddleware).use(validateMiddleware(queryParamsSchema, "query"));

router.route("/ping").get((_req, res) => res.send({ success: true }));

router.use(authenticationRoutes);

router.use(authenticateMiddleware);

router.use(agencyRoutes);
router.use(cityRoutes);
router.use(clientRoutes);
router.use(companyRoutes);
router.use(employeeRoutes);
router.use(employeeRatingRoutes);
router.use(hubRoutes);
router.use(rideRoutes);
router.use(salaryRoutes);
router.use(shipmentRoutes);
router.use(vehicleRoutes);
router.use(rideTemplateRoutes);
router.use(deliveryReceiptRoutes);

router.use(errorHandlerMiddleware);

export default router;
