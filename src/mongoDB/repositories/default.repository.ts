import { Model, FilterQuery } from "mongoose";

export default class DefaultRepository<T> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  findById = async (id: string): Promise<T> => {
    return this.model.findById(id).lean();
  };

  findOne = async (filter: FilterQuery<T> = {}): Promise<T> => {
    return this.model.findOne(filter).lean();
  };

  list = async (filter: FilterQuery<T> = {}): Promise<T[]> => {
    return this.model.find(filter).lean();
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

  deleteById = async (id: string): Promise<T | null> => {
    return this.model.findByIdAndDelete(id);
  };

  updateWhereId = async (id: string, data = {}): Promise<T | null> => {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  };
}
