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
  const { groupedFilter, ...restFilter } = filter;

  if (Object.keys(restFilter).length < 1 && Object.keys(groupedFilter as Record<string, any>).length < 1) return {};
  const or = restFilter
    ? {
        $or: Object.entries(restFilter).map(([key, value]) => {
          return {
            [key]: getFilterValue(value),
          };
        }),
      }
    : {};

  const and = groupedFilter
    ? {
        $and: Object.entries(groupedFilter).map(([key, value]) => ({ [key]: getFilterValue(value) })),
      }
    : {};

  return Object.assign({}, or, and);
}

export const buildListOptions = (options: ListOptionsInterface): ListOptionsInterface => ({
  ...defaultListOptions,
  ...options,
});
