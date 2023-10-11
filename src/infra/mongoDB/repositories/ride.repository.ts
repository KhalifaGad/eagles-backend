import { RideInterface } from "$types";
import { RideModel } from "../models/index.js";
import DefaultRepository from "./default.repository.js";

class RideRepository extends DefaultRepository<RideInterface> {
  constructor() {
    super(RideModel, [
      {
        path: "steps",
        populate: { path: "stepLocationEntity" },
      },
      { path: "employees", populate: { path: "address.city" } },
      {
        path: "shipments",
        populate: [
          { path: "consignee", populate: { path: "address.city" } },
          { path: "consignor", populate: { path: "address.city" } },
          { path: "originAgency", populate: { path: "address.city" } },
          { path: "destinationAgency", populate: { path: "address.city" } },
          { path: "events.employee", populate: { path: "address.city" } },
          { path: "events.products" },
        ],
      },
    ]);
  }
}

export default new RideRepository();
