import { FilterQuery } from "mongoose";
import DefaultRepository from "./default.repository";
import { RideModel } from "../models";
import { RideInterface } from "../../types";

class RideRepository extends DefaultRepository<RideInterface> {
  constructor() {
    super(RideModel);
  }

  findById = async (id: string): Promise<RideInterface> => {
    return RideModel.findById(id)
      .populate([
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
      ])
      .lean();
  };

  findOne = async (filter: FilterQuery<RideInterface> = {}): Promise<RideInterface> => {
    return RideModel.findOne(filter)
      .populate([
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
      ])
      .lean();
  };

  list = async (filter: FilterQuery<RideInterface> = {}): Promise<RideInterface[]> => {
    return RideModel.find(filter)
      .populate([
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
      ])
      .lean();
  };
}

export default new RideRepository();
