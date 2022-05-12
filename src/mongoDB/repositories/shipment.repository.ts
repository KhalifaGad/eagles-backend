import DefaultRepository from "./default.repository";
import { ShipmentModel } from "../models";
import { ShipmentInterface } from "../../types";

class ShipmentRepository extends DefaultRepository<ShipmentInterface> {
  constructor() {
    super(ShipmentModel, [
      { path: "consignee", populate: { path: "address.city" } },
      { path: "consignor", populate: { path: "address.city" } },
      { path: "originAgency", populate: { path: "address.city" } },
      { path: "destinationAgency", populate: { path: "address.city" } },
      { path: "events.employee", populate: { path: "address.city" } },
      { path: "events.products" },
    ]);
  }

  create = async (data: ShipmentInterface): Promise<ShipmentInterface> => {
    return ShipmentModel.create({
      ...data,
      isInCity: data.originAgency.toString() === data.destinationAgency.toString(),
    });
  };
}

export default new ShipmentRepository();
