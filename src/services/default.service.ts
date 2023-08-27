import { Types } from "mongoose";
import Repository from "../mongoDB/repositories";
import { AuthUser, ListArgumentsInterface, ListInterface } from "../types";

export default class DefaultService<T> {
  repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
    this.list = this.list.bind(this);
    this.show = this.show.bind(this);
    this.create = this.create.bind(this);
    this.bulkCreate = this.bulkCreate.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }


  list(listArguments: ListArgumentsInterface<T>, authUser?: AuthUser): Promise<ListInterface<T>>;
  async list(listArguments: ListArgumentsInterface<T>) {
    return this.repository.list(listArguments);
  }

  show(id: string, authUser?: AuthUser): Promise<T | null>;
  async show(id: string) {
    return this.repository.findById(id);
  }

  create(data: T, authUser?: AuthUser): Promise<T>;
  async create(data: T) {
    return this.repository.create(data);
  }

  bulkCreate(data: T[], authUser?: AuthUser): Promise<T[]>;
  async bulkCreate(data: T[]): Promise<T[]> {
    return this.repository.insertMany(data);
  }

  update(id: string, data: T, authUser?: AuthUser): Promise<T | null>;
  async update(id: string, data: T) {
    return this.repository.updateWhereId(id, data);
  }

  delete(id: string, authUser?: AuthUser): Promise<T | null>;
  async delete(id: string): Promise<T | null> {
    return this.repository.deleteById(id);
  }
}
