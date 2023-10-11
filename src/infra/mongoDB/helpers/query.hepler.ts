import { ListOptionsInterface } from "$types";
import { FilterQuery, Types } from "mongoose";
import { defaultListOptions } from "../constants/index.js";

function getFilterValue(value: unknown) {
  if (typeof value === "string") {
    return Types.ObjectId.isValid(value) ? value : { $regex: value, $options: "i" };
  }
  if (Array.isArray(value)) {
    return { $in: value };
  }

  return value;
}

export function buildSearch(filter: Record<string, unknown>): FilterQuery<any> {
  return Object.keys(filter).length > 0
    ? {
        $or: Object.keys(filter).map(property => {
          return {
            [property]: getFilterValue(filter[property]),
          };
        }),
      }
    : {};
}

export const buildListOptions = (options: ListOptionsInterface): ListOptionsInterface => ({
  ...defaultListOptions,
  ...options,
});
