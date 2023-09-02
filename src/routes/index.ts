import { Router } from "express";
import agencyRoutes from "./agency.routes";
import cityRoutes from "./city.routes";
import clientRoutes from "./client.routes";
import companyRoutes from "./company.routes";
import authenticationRoutes from "./authentication.routes";
import employeeRoutes from "./employee.routes";
import employeeRatingRoutes from "./employeeRating.routes";
import hubRoutes from "./hub.routes";
import rideRoutes from "./ride.routes";
import salaryRoutes from "./salary.routes";
import shipmentRoutes from "./shipment.routes";
import vehicleRoutes from "./vehicle.routes";
import rideTemplateRoutes from "./rideTemplate.routes";
import deliveryReceiptRoutes from "./deliveryReceipt.routes"
import {
  queryParamsMiddleware,
  authenticateMiddleware,
  errorHandlerMiddleware,
  validateMiddleware,
} from "../middlewares";
import { queryParamsSchema } from "../validations";

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
