import { ShipmentInterface } from "$types";
import { ShipmentModel } from "../models/index.js";
import DefaultRepository from "./default.repository.js";

class ShipmentRepository extends DefaultRepository<ShipmentInterface> {
  constructor() {
    super(ShipmentModel, [
      { path: "consignee", populate: { path: "address", populate: { path: "city" } } },
      { path: "consignor", populate: { path: "address.city" } },
      { path: "originAgency", populate: { path: "address.city" } },
      { path: "destinationAgency", populate: { path: "address.city" } },
      { path: "originHotspot" },
      { path: "destinationHotspot" },
      { path: "hub" },
      { path: "events.employee", populate: { path: "address.city" } },
      { path: "events.products" },
    ]);
  }
}

export default new ShipmentRepository();
