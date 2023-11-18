import { Entity } from "$types";
import { Types as MongooseTypes } from "mongoose";

export function isOfTypeEntity<T extends Entity<unknown>>(value: Entity<T>): value is T {
  return !(value instanceof MongooseTypes.ObjectId);
}
