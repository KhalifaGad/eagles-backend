import { FilterQuery } from "mongoose";
import Repository from "../mongoDB/repositories";

export default class DefaultService<T> {
  private repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  async list() {
    return this.repository.list();
  }

  async show(filter: FilterQuery<T> = {}) {
    return this.repository.findOne(filter);
  }

  async create(data: T) {
    return this.repository.create(data);
  }

  async update(id: string, data: T) {
    return this.repository.updateWhereId(id, data);
  }
}
