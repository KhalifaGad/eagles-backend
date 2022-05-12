import DefaultRepository from "./default.repository";
import { RideModel } from "../models";
import { RideInterface } from "../../types";

class RideRepository extends DefaultRepository<RideInterface> {
  constructor() {
    super(RideModel, [
      { path: "employees", populate: { path: "address.city" } },
      { path: "vehicle" },
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
      { path: "locations.city" },
    ]);
  }
}

export default new RideRepository();
