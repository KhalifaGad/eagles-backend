import { agencyRepository } from "../mongoDB/repositories";
import { rideTemplateRepository } from "../mongoDB/repositories";
import DefaultService from "./default.service";
import { CreateRideTemplateInterface, RideTemplateInterface } from "../types";

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
    const hubs = await agencyRepository.findMany({ _id: { $in: hubIds } });

    const preparedStep = steps.map(step => {
      const locationEntity =
        step.stepLocationType === "Hub"
          ? hubs.find(hub => `${hub._id}` === step.stepLocationEntity)
          : agencies.find(agency => `${agency._id}` === step.stepLocationEntity);
      if (!locationEntity) throw new Error("Not Found");
      return {
        name: locationEntity.name,
        sequence: step.sequence,
        stepLocationType: step.stepLocationType,
        area: locationEntity.address.area,
        street: locationEntity.address.street,
        cityName: (locationEntity.address.city as any).arabicName,
        landmark: locationEntity.address.landmark,
        lat: locationEntity.address.lat,
        lng: locationEntity.address.lng,
      };
    });

    return super.create({ ...rest, steps: preparedStep });
  }
}

export default new RideTemplateService();
