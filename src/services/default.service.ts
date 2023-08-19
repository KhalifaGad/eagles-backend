import { Types } from "mongoose";
import Repository from "../mongoDB/repositories";
import { ListArgumentsInterface } from "../types";

export default class DefaultService<T> {
  repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  list = async (listArguments: ListArgumentsInterface<T>) => this.repository.list(listArguments);

  show = async (id: string) => this.repository.findById(new Types.ObjectId(id));

  create = async (data: T) => this.repository.create(data);

  bulkCreate = async (data: T[]): Promise<T[]> => this.repository.insertMany(data);

  update = async (id: string, data: T) => this.repository.updateWhereId(new Types.ObjectId(id), data);

  delete = async (id: string): Promise<T | null> => this.repository.deleteById(new Types.ObjectId(id));
}
