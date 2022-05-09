import { FilterQuery } from "mongoose";
import DefaultRepository from "./default.repository";
import { EmployeeModel } from "../models";
import { EmployeeInterface } from "../../types";

class EmployeeRepository extends DefaultRepository<EmployeeInterface> {
  constructor() {
    super(EmployeeModel);
  }

  findById = async (id: string): Promise<EmployeeInterface> => {
    return EmployeeModel.findById(id).populate({ path: "address.city" }).lean();
  };

  findOne = async (filter: FilterQuery<EmployeeInterface> = {}): Promise<EmployeeInterface> => {
    return EmployeeModel.findOne(filter).populate({ path: "address.city" }).lean();
  };

  list = async (filter: FilterQuery<EmployeeInterface> = {}): Promise<EmployeeInterface[]> => {
    return EmployeeModel.find(filter).populate({ path: "address.city" }).lean();
  };
}

export default new EmployeeRepository();
