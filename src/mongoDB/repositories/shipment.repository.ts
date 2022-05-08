import { FilterQuery } from "mongoose";
import DefaultRepository from "./default.repository";
import { ShipmentModel } from "../models";
import { ShipmentInterface } from "../../types";

class ShipmentRepository extends DefaultRepository<ShipmentInterface> {
  constructor() {
    super(ShipmentModel);
  }

  findById = async (id: string): Promise<ShipmentInterface> => {
    return ShipmentModel.findById(id)
      .populate("consignee")
      .populate("consignor")
      .populate("originAgency")
      .populate("destinationAgency")
      .populate("events.employee")
      .populate("events.products")
      .lean();
  };

  findOne = async (filter: FilterQuery<ShipmentInterface> = {}): Promise<ShipmentInterface> => {
    return ShipmentModel.findOne(filter)
      .populate("consignee")
      .populate("consignor")
      .populate("originAgency")
      .populate("destinationAgency")
      .populate("events.employee")
      .populate("events.products")
      .lean();
  };

  list = async (filter: FilterQuery<ShipmentInterface> = {}): Promise<ShipmentInterface[]> => {
    return ShipmentModel.find(filter)
      .populate("consignee")
      .populate("consignor")
      .populate("originAgency")
      .populate("destinationAgency")
      .populate("events.employee")
      .populate("events.products")
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
