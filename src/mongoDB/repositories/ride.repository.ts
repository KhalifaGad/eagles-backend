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
      .populate("employees")
      .populate("vehicle")
      .populate("shipments")
      .populate("locations.city")
      .lean();
  };

  findOne = async (filter: FilterQuery<RideInterface> = {}): Promise<RideInterface> => {
    return RideModel.findOne(filter)
      .populate("employees")
      .populate("vehicle")
      .populate("shipments")
      .populate("locations.city")
      .lean();
  };

  list = async (filter: FilterQuery<RideInterface> = {}): Promise<RideInterface[]> => {
    return RideModel.find(filter)
      .populate("employees")
      .populate("vehicle")
      .populate("shipments")
      .populate("locations.city")
      .lean();
  };
}

export default new RideRepository();
