import { FilterQuery } from "mongoose";
import { ListOptionsInterface } from "../types";
import { defaultListOptions } from "../../constants";

/* eslint-disable @typescript-eslint/no-explicit-any */

export const buildSearch = (filter: FilterQuery<any>): FilterQuery<any> =>
  Object.keys(filter).reduce(
    (accumulator, key) =>
      Object.assign(accumulator, {
        [key]: typeof filter[key] === "string" ? { $regex: filter[key], $options: "i" } : filter[key],
      }),
    {}
  );

export const buildListOptions = (options: ListOptionsInterface): ListOptionsInterface => ({
  ...defaultListOptions,
  ...options,
});
