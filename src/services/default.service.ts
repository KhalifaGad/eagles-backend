import { DefaultRepository } from "$infra";
import { AuthUser, ID, ListArgumentsInterface, ListInterface } from "$types";

export default class DefaultService<T> {
  repository: DefaultRepository<T>;

  constructor(repository: DefaultRepository<T>) {
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

  show(id: ID, authUser?: AuthUser): Promise<T | null>;
  async show(id: ID) {
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

  update(id: ID, data: T, authUser?: AuthUser): Promise<T | null>;
  async update(id: ID, data: T) {
    return this.repository.updateWhereId(id, data);
  }

  delete(id: ID, authUser?: AuthUser): Promise<T | null>;
  async delete(id: ID): Promise<T | null> {
    return this.repository.deleteById(id);
  }
}
