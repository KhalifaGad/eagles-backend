import { FilterQuery } from "mongoose";
import { ListOptionsInterface } from "../types";
import { defaultListOptions } from "../../constants";

/* eslint-disable @typescript-eslint/no-explicit-any */

export const buildSearch = (filter: FilterQuery<any>): FilterQuery<any> => ({
  $or: Object.keys(filter).map(property => ({
    [property]: typeof filter[property] === "string" ? { $regex: filter[property], $options: "i" } : filter[property],
  })),
});

export const buildListOptions = (options: ListOptionsInterface): ListOptionsInterface => ({
  ...defaultListOptions,
  ...options,
});
