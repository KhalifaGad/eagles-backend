import { Router } from "express";
import agencyRoutes from "./agency.routes";
import cityRoutes from "./city.routes";
import clientRoutes from "./client.routes";
import companyRoutes from "./company.routes";
import authenticationRoutes from "./authentication.routes";
import employeeRoutes from "./employee.routes";
import employeeRatingRoutes from "./employeeRating.routes";
import hubRoutes from "./hub.routes";
import merchantRoutes from "./merchant.routes";
import rideRoutes from "./ride.routes";
import salaryRoutes from "./salary.routes";
import shipmentRoutes from "./shipment.routes";
import vehicleRoutes from "./vehicle.routes";
import { queryParamsMiddleware, authenticateMiddleware, errorHandlerMiddleware } from "../middlewares";

const router = Router().use(queryParamsMiddleware);

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
router.use(merchantRoutes);
router.use(rideRoutes);
router.use(salaryRoutes);
router.use(shipmentRoutes);
router.use(vehicleRoutes);

router.use(errorHandlerMiddleware);

export default router;
