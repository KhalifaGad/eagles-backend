import { FilterQuery } from "mongoose";
import Repository from "../mongoDB/repositories";
import { MongooseID } from "../types";

export default class DefaultService<T> {
  private repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  list = async (filter: FilterQuery<T> = {}) => {
    return this.repository.list(filter);
  };

  show = async (id: MongooseID) => {
    return this.repository.findById(id);
  };

  create = async (data: T) => {
    return this.repository.create(data);
  };

  bulkCreate = async (data: T[]): Promise<T[]> => {
    return this.repository.insertMany(data);
  };

  update = async (id: MongooseID, data: T) => {
    return this.repository.updateWhereId(id, data);
  };

  delete = async (id: MongooseID): Promise<T | null> => {
    return this.repository.deleteById(id);
  };
}
