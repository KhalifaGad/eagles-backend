import { FilterQuery } from "mongoose";
import DefaultRepository from "./default.repository";
import { ShipmentModel } from "../models";
import { ShipmentInterface, MongooseID } from "../../types";

class ShipmentRepository extends DefaultRepository<ShipmentInterface> {
  constructor() {
    super(ShipmentModel);
  }

  findById = async (id: MongooseID): Promise<ShipmentInterface> => {
    return ShipmentModel.findById(id)
      .populate([
        { path: "consignee", populate: { path: "address.city" } },
        { path: "consignor", populate: { path: "address.city" } },
        { path: "originAgency", populate: { path: "address.city" } },
        { path: "destinationAgency", populate: { path: "address.city" } },
        { path: "events.employee", populate: { path: "address.city" } },
        { path: "events.products" },
      ])
      .lean();
  };

  findOne = async (filter: FilterQuery<ShipmentInterface> = {}): Promise<ShipmentInterface> => {
    return ShipmentModel.findOne(filter)
      .populate([
        { path: "consignee", populate: { path: "address.city" } },
        { path: "consignor", populate: { path: "address.city" } },
        { path: "originAgency", populate: { path: "address.city" } },
        { path: "destinationAgency", populate: { path: "address.city" } },
        { path: "events.employee", populate: { path: "address.city" } },
        { path: "events.products" },
      ])
      .lean();
  };

  list = async (filter: FilterQuery<ShipmentInterface> = {}): Promise<ShipmentInterface[]> => {
    return ShipmentModel.find(filter)
      .populate([
        { path: "consignee", populate: { path: "address.city" } },
        { path: "consignor", populate: { path: "address.city" } },
        { path: "originAgency", populate: { path: "address.city" } },
        { path: "destinationAgency", populate: { path: "address.city" } },
        { path: "events.employee", populate: { path: "address.city" } },
        { path: "events.products" },
      ])
      .lean();
  };

  create = async (data: ShipmentInterface): Promise<ShipmentInterface> => {
    return ShipmentModel.create({
      ...data,
      isInCity: data.originAgency.toString() === data.destinationAgency.toString(),
    });
  };
}

export default new ShipmentRepository();
