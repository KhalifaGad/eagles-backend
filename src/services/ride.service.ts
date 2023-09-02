import { notFound } from "../errors";
import { getUniqueCode } from "../utilities";
import { rideRepository, rideTemplateRepository } from "../mongoDB/repositories";
import DefaultService from "./default.service";
import { CreateRidePayload, RideInterface } from "../types";

class RideService extends DefaultService<RideInterface> {
  constructor() {
    super(rideRepository);
    this.createRide = this.createRide.bind(this);
  }

  async createRide(payload: CreateRidePayload) {
    const { rideTemplateId, ...restPayload } = payload;
    const rideTemplate = await rideTemplateRepository.findById(rideTemplateId);
    if (!rideTemplateId) throw notFound("لا يمكن إيجاد نموذج الرحله");
    const { steps } = rideTemplate;
    return this.create({
      ...restPayload,
      steps,
      code: getUniqueCode(),
    });
  }
}

export default new RideService();
