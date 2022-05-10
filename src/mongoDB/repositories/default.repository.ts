import { Model, FilterQuery } from "mongoose";
import { MongooseID } from "../../types";

export default class DefaultRepository<T> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  private search = (filter: FilterQuery<T> = {}): FilterQuery<T> => {
    const filterQuery: FilterQuery<T> = {};

    Object.keys(filter).forEach(key => {
      if (typeof filter[key] === "string") {
        return Object.assign(filterQuery, { [key]: { $regex: filter[key], $options: "i" } });
      }
      Object.assign(filterQuery, { [key]: filter[key] });
    });

    return filterQuery;
  };

  findById = async (id: MongooseID): Promise<T> => {
    return this.model.findById(id).lean();
  };

  findOne = async (filter: FilterQuery<T> = {}): Promise<T> => {
    return this.model.findOne(filter).lean();
  };

  list = async (filter: FilterQuery<T> = {}): Promise<T[]> => {
    return this.model.find(this.search(filter)).lean();
  };

  count = async (filter: FilterQuery<T> = {}): Promise<number> => {
    return this.model.countDocuments(filter);
  };

  create = async (data: T): Promise<T> => {
    return this.model.create(data);
  };

  insertMany = async (data: T[]): Promise<T[]> => {
    return this.model.insertMany(data);
  };

  deleteById = async (id: MongooseID): Promise<T | null> => {
    return this.model.findByIdAndDelete(id);
  };

  updateWhereId = async (id: MongooseID, data = {}): Promise<T | null> => {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  };
}
