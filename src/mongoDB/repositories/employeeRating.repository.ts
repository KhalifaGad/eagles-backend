import { FilterQuery } from "mongoose";
import DefaultRepository from "./default.repository";
import { EmployeeRatingModel } from "../models";
import { EmployeeRatingInterface, MongooseID } from "../../types";

class EmployeeRatingRepository extends DefaultRepository<EmployeeRatingInterface> {
  constructor() {
    super(EmployeeRatingModel);
  }

  findById = async (id: MongooseID): Promise<EmployeeRatingInterface> => {
    return EmployeeRatingModel.findById(id)
      .populate([
        { path: "employee", populate: { path: "address.city" } },
        { path: "agency", populate: { path: "address.city" } },
      ])
      .lean();
  };

  findOne = async (filter: FilterQuery<EmployeeRatingInterface> = {}): Promise<EmployeeRatingInterface> => {
    return EmployeeRatingModel.findOne(filter)
      .populate([
        { path: "employee", populate: { path: "address.city" } },
        { path: "agency", populate: { path: "address.city" } },
      ])
      .lean();
  };

  list = async (filter: FilterQuery<EmployeeRatingInterface> = {}): Promise<EmployeeRatingInterface[]> => {
    return EmployeeRatingModel.find(filter)
      .populate([
        { path: "employee", populate: { path: "address.city" } },
        { path: "agency", populate: { path: "address.city" } },
      ])
      .lean();
  };
}

export default new EmployeeRatingRepository();
