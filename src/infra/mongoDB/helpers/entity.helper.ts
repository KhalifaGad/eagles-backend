import { Types as MongooseTypes } from "mongoose";
import { Entity } from "$types";

function isMongooseID<T>(value: Entity<T>): value is MongooseTypes.ObjectId {
  return value instanceof MongooseTypes.ObjectId || typeof value === "string";
}

export function isOfTypeEntity<T extends Entity<any>>(value: Entity<T>): value is T {
  return !isMongooseID(value);
}
