import DefaultRepository from "./default.repository.js";
import { ShipmentModel } from "../models/index.js";
import { ShipmentInterface } from "$types";

class ShipmentRepository extends DefaultRepository<ShipmentInterface> {
  constructor() {
    super(ShipmentModel, [
      { path: "consignee", populate: { path: "address.city" } },
      { path: "consignor", populate: { path: "address.city" } },
      { path: "originAgency", populate: { path: "address.city" } },
      { path: "destinationAgency", populate: { path: "address.city" } },
      { path: "originHotspot" },
      { path: "destinationHotspot" },
      { path: "hub" },
      { path: "events.employee", populate: { path: "address.city" } },
      { path: "events.produ.js" },
    ]);
  }
}

export default new ShipmentRepository();
