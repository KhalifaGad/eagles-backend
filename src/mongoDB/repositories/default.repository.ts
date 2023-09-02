import { DeleteResult } from "mongodb";
import { FilterQuery, Model, PopulateOptions } from "mongoose";
import { ListArgumentsInterface, ListInterface, ListOptionsInterface, ID } from "../../types";
import { buildListOptions, buildSearch } from "../helpers";

export default class DefaultRepository<T> {
  private model: Model<T>;
  private population?: PopulateOptions | PopulateOptions[];

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

  async findById(id: ID): Promise<T>  {
    if (this.population) return this.model.findById(id).populate(this.population).lean();
    return this.model.findById(id).lean();
  }

  async findOne(filter: FilterQuery<T> = {}): Promise<T> {
    if (this.population) return this.model.findOne(filter).populate(this.population).lean();
    return this.model.findOne(filter).lean();
  }

  async findMany(filter: FilterQuery<T> = {}): Promise<T[]> {
    if (this.population) return this.model.find(filter).populate(this.population).lean();
    return this.model.find(filter).lean();
  }

  async list({ filter = {}, options, ignoreLean = false }: ListArgumentsInterface<T>): Promise<ListInterface<T>> {
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

    if (this.population) cursor.populate(this.population).lean();

    return {
      data: ignoreLean ? await cursor.exec() : await cursor.lean(),
      totalCount: await this.count(search),
    };
  }

  async count(filter: FilterQuery<T> = {}): Promise<number> {
    return this.model.countDocuments(filter);
  }

  async create(data: Partial<T>): Promise<T> {
    const createdData = await this.model.create(data);
    return this.findById(createdData._id);
  }

  async insertMany(data: T[]): Promise<T[]>{
    const documents = await this.model.insertMany(data);
    return this.findMany({ _id: { $in: documents.map(doc => doc._id) } });
  }

  async upsert(data: T, key: keyof T) {
    const query = { [key]: data[key] } as FilterQuery<T>;
    return this.model.findOneAndUpdate(query, { $set: data }, { upsert: true, new: true });
  }

  async deleteById(id: ID): Promise<T | null> {
    return this.model.findByIdAndDelete(id);
  }

  async deleteBy(criteria: FilterQuery<T>): Promise<DeleteResult> {
    return this.model.deleteMany(criteria);
  }

  async updateWhereId(id: ID, data = {}): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true, populate: this.population, lean: true });
  }
}
