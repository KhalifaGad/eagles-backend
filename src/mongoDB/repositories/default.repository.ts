import { AnyBulkWriteOperation } from "mongodb";
import { FilterQuery, Model, PopulateOptions, UpdateQuery } from "mongoose";
import { ListArgumentsInterface, ListInterface, ListOptionsInterface, MongooseID } from "../../types";
import { buildListOptions, buildSearch } from "../helpers";

export default class DefaultRepository<T> {
  private model: Model<T>;
  private population?: PopulateOptions | PopulateOptions[];

  constructor(model: Model<T>, population?: PopulateOptions | PopulateOptions[]) {
    this.model = model;
    this.population = population;
  }

  findById = async (id: MongooseID): Promise<T> => {
    if (this.population) return this.model.findById(id).populate(this.population).lean();
    return this.model.findById(id).lean();
  };

  findOne = async (filter: FilterQuery<T> = {}): Promise<T> => {
    if (this.population) return this.model.findOne(filter).populate(this.population).lean();
    return this.model.findOne(filter).lean();
  };

  findMany = async (filter: FilterQuery<T> = {}): Promise<T[]> => {
    if (this.population) return this.model.find(filter).populate(this.population).lean();
    return this.model.find(filter).lean();
  };

  list = async ({ filter = {}, options }: ListArgumentsInterface<T>): Promise<ListInterface<T>> => {
    const search = buildSearch(filter);
    const { page, pageLimit, sortBy, sortDirection, showAll } = buildListOptions(options as ListOptionsInterface);
    const cursor = this.model.find(search).sort({ [sortBy]: sortDirection === "desc" ? 1 : -1 });

    if (!showAll) cursor.skip(page * pageLimit).limit(pageLimit);

    if (this.population) cursor.populate(this.population).lean();

    return {
      data: await cursor.lean(),
      totalCount: await this.count(search),
    };
  };

  count = async (filter: FilterQuery<T> = {}): Promise<number> => {
    return this.model.countDocuments(filter);
  };

  create = async (data: T): Promise<T> => {
    const createdData = await this.model.create(data);
    return this.findById(createdData._id);
  };

  insertMany = async (data: T[]): Promise<T[]> => {
    const documents = await this.model.insertMany(data);
    return this.findMany({ _id: { $in: documents.map(doc => doc._id) } });
  };

  upsert(data: T , key: keyof T) {
    const query = {[key]: data[key] } as FilterQuery<T>
    return this.model.findOneAndUpdate(query, { $set: data } , {upsert: true, new: true} )
  }

  deleteById = async (id: MongooseID): Promise<T | null> => {
    return this.model.findByIdAndDelete(id);
  };

  updateWhereId = async (id: MongooseID, data = {}): Promise<T | null> => {
    return this.model.findByIdAndUpdate(id, data, { new: true, populate: this.population, lean: true });
  };
}
