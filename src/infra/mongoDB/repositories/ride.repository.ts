import DefaultRepository from "./default.repository.js";
import { RideModel } from "../models/index.js";
import { RideInterface } from "$types";

class RideRepository extends DefaultRepository<RideInterface> {
  constructor() {
    super(RideModel, [
      { path: "employees", populate: { path: "address.city" } },
      { path: "vehicle" },
      {
        path: "shipme.js",
        populate: [
          { path: "consignee", populate: { path: "address.city" } },
          { path: "consignor", populate: { path: "address.city" } },
          { path: "originAgency", populate: { path: "address.city" } },
          { path: "destinationAgency", populate: { path: "address.city" } },
          { path: "events.employee", populate: { path: "address.city" } },
          { path: "events.produ.js" },
        ],
      },
      { path: "locations.city" },
    ]);
  }
}

export default new RideRepository();
