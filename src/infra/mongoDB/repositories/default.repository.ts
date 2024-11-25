import { ID, ListArgumentsInterface, ListInterface, ListOptionsInterface } from "$types";
import { DeleteResult } from "mongodb";
import { AnyKeys, AnyObject, FilterQuery, Model, PopulateOptions, Require_id } from "mongoose";
import { buildListOptions, buildSearch } from "../helpers/index.js";

export default class DefaultRepository<T> {
  protected readonly model: Model<T>;
  protected readonly population?: PopulateOptions | PopulateOptions[];

  constructor(model: Model<T>, population?: PopulateOptions | PopulateOptions[]) {
    this.model = model;
    this.population = population;
    this.findById = this.findById.bind(this);
    this.findOne = this.findOne.bind(this);
    this.findMany = this.findMany.bind(this);
    this.list = this.list.bind(this);
    this.count = this.count.bind(this);
    this.create = this.create.bind(this);
    this.insertMany = this.insertMany.bind(this);
    this.upsert = this.upsert.bind(this);
    this.deleteById = this.deleteById.bind(this);
    this.deleteBy = this.deleteBy.bind(this);
    this.updateWhereId = this.updateWhereId.bind(this);
  }

  async findById(id: ID): Promise<Require_id<T> | null> {
    const doc = this.population
      ? await this.model.findById(id).populate(this.population).lean()
      : await this.model.findById(id).lean();
    if (doc) {
      return doc as Require_id<T>;
    }
    return null;
  }

  async findOne(filter: FilterQuery<T> = {}): Promise<T | null> {
    if (this.population) return this.model.findOne(filter).populate(this.population).lean() as Promise<T | null>;
    return this.model.findOne(filter).lean() as Promise<T | null>;
  }

  async findMany(filter: FilterQuery<T> = {}, ignorePopulations?: boolean): Promise<T[]> {
    if (this.population && !ignorePopulations) return this.model.find(filter).populate(this.population).lean();
    return this.model.find(filter).lean();
  }

  async list({ filter = {}, options }: ListArgumentsInterface<T>): Promise<ListInterface<T>> {
    const search = buildSearch(filter);

    const {
      page = 0,
      pageLimit = 0,
      sortBy,
      sortDirection,
      showAll,
    } = buildListOptions(options as ListOptionsInterface);
    const cursor = this.model.find(search).sort({ [sortBy ?? "createdAt"]: sortDirection === "desc" ? 1 : -1 });

    if (!showAll) cursor.skip(page * pageLimit).limit(pageLimit);

    if (this.population) cursor.populate(this.population);
    cursor.lean();

    const [data, totalCount] = await Promise.all([cursor.exec(), this.count(search)]);

    return {
      data,
      totalCount,
    };
  }

  async count(filter: FilterQuery<T> = {}): Promise<number> {
    return this.model.countDocuments(filter);
  }

  async create(data: AnyKeys<T>): Promise<T> {
    const createdData = await this.model.create(data);
    return (await this.findById(createdData._id as ID)) as T;
  }

  async insertMany(data: T[]): Promise<T[]> {
    const documents = await this.model.insertMany(data);
    return this.findMany({ _id: { $in: documents.map(doc => doc._id) } });
  }

  async upsert(data: T & AnyObject, key: keyof T) {
    const query = { [key]: data[key] } as FilterQuery<T>;
    return this.model.findOneAndUpdate(query, { $set: data }, { upsert: true, new: true });
  }

  async deleteById(id: ID): Promise<T | null> {
    return this.model.findByIdAndDelete(id);
  }

  async deleteBy(criteria: FilterQuery<T>): Promise<DeleteResult> {
    return this.model.deleteMany(criteria);
  }

  async updateWhereId(id: ID, data: Partial<T> = {}): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, {
      new: true,
      populate: this.population,
      lean: true,
    }) as Promise<T | null>;
  }
}
