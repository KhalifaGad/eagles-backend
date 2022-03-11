import { Model } from "mongoose";

export default class BaseRepository<T> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async findById(id: string, populateField?: string): Promise<T> {
    if (populateField) {
      return this.model.findById(id).populate(populateField).lean();
    }
    return this.model.findById(id).lean();
  }

  async findOne(filter = {}): Promise<T> {
    return this.model.findOne(filter).lean();
  }

  async list(filter = {}, populateField?: string): Promise<T[]> {
    if (populateField) {
      return this.model.find(filter).populate(populateField).lean();
    }
    return this.model.find(filter).lean();
  }

  async count(filter = {}): Promise<number> {
    return this.model.countDocuments(filter);
  }

  async create(data: T): Promise<T> {
    return this.model.create(data);
  }

  async insertMany(data: T[]): Promise<T[]> {
    return this.model.insertMany(data);
  }

  async deleteById(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id);
  }

  async updateWhereId(id: string, data = {}): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }
}
