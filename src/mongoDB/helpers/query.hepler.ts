import { FilterQuery, Types } from "mongoose";
import { ListOptionsInterface } from "../../types";
import { defaultListOptions } from "../constants";

function getFilterValue(value: unknown) {
  if (typeof value === "string") {
    return Types.ObjectId.isValid(value) ? value : { $regex: value, $options: "i" };
  }
  return value;
}

export function buildSearch(filter: Record<string, unknown>): FilterQuery<any> {
  return Object.keys(filter).length > 0
    ? {
        $or: Object.keys(filter).map(property => {
          const val = {
            [property]: getFilterValue(filter[property]),
          };
          // console.log(val)
          return val;
        }),
      }
    : {};
}

export const buildListOptions = (options: ListOptionsInterface): ListOptionsInterface => ({
  ...defaultListOptions,
  ...options,
});
