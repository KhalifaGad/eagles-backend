import { Model } from "mongoose";

// TODO: args = {}

export default class BaseRepository<T> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async count(args = {}) {
    return this.model.countDocuments(args);
  }

  async create(data: T) {
    return this.model.create(data);
  }

  async findById(id: string, populateField?: string) {
    if (populateField) {
      return this.model.findById(id).populate(populateField).lean();
    }
    return this.model.findById(id).lean();
  }

  async RawFindById(id: string) {
    return this.model.findById(id);
  }

  async findOne(args = {}) {
    return this.model.findOne(args).lean();
  }

  async asyncUpdateWhereId(id: string, data = {}) {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async list(args = {}, populateField?: string) {
    if (populateField) {
      return this.model.find(args).populate(populateField).lean();
    }
    return this.model.find(args).lean();
  }

  async RawList(args = {}, populateField?: string) {
    if (populateField) {
      return this.model.find(args).populate(populateField);
    }
    return this.model.find(args);
  }

  async delete(id: string) {
    return this.model.findByIdAndDelete(id);
  }

  async insertMany(data: T[]) {
    return this.model.insertMany(data);
  }
}
