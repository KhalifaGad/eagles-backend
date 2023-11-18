import { Entity } from "$types";
import { Require_id } from "mongoose";

export const getEntityRef = <T>(entity: Entity<T>) => {
  return typeof entity === "string" ? entity : `${(entity as Require_id<T>)._id}`;
};

export const removeEmptyStrings = <T>(obj: Record<string, any>) => {
  return Object.fromEntries(Object.entries(obj).map(([k, v]: [string, any]) => [k, v === "" ? null : v])) as T;
};
