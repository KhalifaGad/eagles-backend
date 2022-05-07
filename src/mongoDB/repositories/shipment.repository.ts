import DefaultRepository from "./default.repository";
import { ShipmentModel } from "../models";
import { ShipmentInterface } from "../../types";

class ShipmentRepository extends DefaultRepository<ShipmentInterface> {
  constructor() {
    super(ShipmentModel);
  }

  create(data: ShipmentInterface): Promise<ShipmentInterface> {
    return ShipmentModel.create({
      ...data,
      isInCity: data.originAgency.toString() === data.destinationAgency.toString(),
    });
  }
}

export default new ShipmentRepository();
