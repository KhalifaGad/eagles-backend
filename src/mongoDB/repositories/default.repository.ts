import { Model, FilterQuery, PopulateOptions } from "mongoose";
import { MongooseID, ListArgumentsInterface, ListOptionsInterface, ListInterface } from "../../types";
import { buildSearch, buildListOptions } from "../../helpers";

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

  list = async ({ filter = {}, options }: ListArgumentsInterface<T>): Promise<ListInterface<T>> => {
    const search = buildSearch(filter);
    const { page, pageLimit, sortBy, sortDirection, showAll } = buildListOptions(options as ListOptionsInterface);
    const curser = this.model.find(search).sort({ [sortBy]: sortDirection === "asc" ? 1 : -1 });

    if (!showAll) curser.skip(page * pageLimit).limit(pageLimit);

    if (this.population) curser.populate(this.population).lean();

    return {
      data: await curser.lean(),
      totalCount: await this.count(search),
    };
  };

  count = async (filter: FilterQuery<T> = {}): Promise<number> => {
    return this.model.countDocuments(filter);
  };

  create = async (data: T): Promise<T> => {
    return this.model.create(data);
  };

  insertMany = async (data: T[]): Promise<T[]> => {
    return this.model.insertMany(data);
  };

  deleteById = async (id: MongooseID): Promise<T | null> => {
    return this.model.findByIdAndDelete(id);
  };

  updateWhereId = async (id: MongooseID, data = {}): Promise<T | null> => {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  };
}
