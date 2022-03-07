import { Model } from "mongoose";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default class BaseRepository<Document> {
  private model: Model<Document>;

  constructor(model: Model<Document>) {
    this.model = model;
  }

  async count(args = {}) {
    return this.model.countDocuments(args);
  }

  async create(data: any) {
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

  async insertMany(data: any[]) {
    return this.model.insertMany(data);
  }
}
