import { agencyRepository, hubRepository, rideTemplateRepository } from "$infra";
import { CreateRideTemplateInterface, ID, RideTemplateInterface } from "$types";
import DefaultService from "./default.service.js";

class RideTemplateService extends DefaultService<RideTemplateInterface> {
  constructor() {
    super(rideTemplateRepository);
    this.createTemplate = this.createTemplate.bind(this);
  }

  async createTemplate(data: CreateRideTemplateInterface) {
    const { steps, ...rest } = data;
    const hubIds = steps.filter(step => step.stepLocationType === "Hub").map(step => step.stepLocationEntity);
    const agencyIds = steps.filter(step => step.stepLocationType === "Agency").map(step => step.stepLocationEntity);

    const agencies = await agencyRepository.findMany({ _id: { $in: agencyIds } });
    const hubs = await hubRepository.findMany({ _id: { $in: hubIds } });
    const preparedStep = steps.map(step => {
      const locationEntity =
        step.stepLocationType === "Hub"
          ? hubs.find(hub => `${hub._id}` === (step.stepLocationEntity as unknown as string))
          : agencies.find(agency => `${agency._id}` === (step.stepLocationEntity as unknown as string));

      if (!locationEntity) throw new Error("Not Found");

      return {
        sequence: step.sequence,
        stepLocationType: step.stepLocationType,
        stepLocationEntity: locationEntity._id as ID,
      };
    });

    return super.create({ ...rest, steps: preparedStep });
  }
}

export default new RideTemplateService();
