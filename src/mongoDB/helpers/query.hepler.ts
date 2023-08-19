import { FilterQuery, Types } from "mongoose";
import { ListOptionsInterface } from "../../types";
import { defaultListOptions } from "../constants";

function getFilterValue(value: unknown) {
  if (typeof value === "string") {
    return Types.ObjectId.isValid(value) ? value : { $regex: value, $options: "i" };
  }
  return value;
}

export const buildSearch = (filter: Record<string, unknown>): FilterQuery<any> =>
  Object.keys(filter).length > 0
    ? {
        $or: Object.keys(filter).map(property => ({
          [property]: getFilterValue(filter[property]),
        })),
      }
    : {};

export const buildListOptions = (options: ListOptionsInterface): ListOptionsInterface => ({
  ...defaultListOptions,
  ...options,
});
