import { rideRepository, rideTemplateRepository } from "$infra";
import { notFound } from "$errors";
import { CreateRidePayload, RideInterface } from "$types";
import { getUniqueCode } from "$utils";
import DefaultService from "./default.service.js";

class RideService extends DefaultService<RideInterface> {
  constructor() {
    super(rideRepository);
    this.createRide = this.createRide.bind(this);
  }

  async createRide(payload: CreateRidePayload) {
    const { rideTemplateId, ...restPayload } = payload;
    const rideTemplate = await rideTemplateRepository.findById(rideTemplateId);
    if (!rideTemplate) throw notFound("لا يمكن إيجاد نموذج الرحله");
    const { steps } = rideTemplate;
    return this.create({
      ...restPayload,
      steps,
      code: getUniqueCode(),
    });
  }
}

export default new RideService();
