import { Entity } from "../../types";
import { Types as MongooseTypes } from "mongoose";

export function isMongooseID<T>(value: Entity<T>): value is MongooseTypes.ObjectId {
	return value instanceof MongooseTypes.ObjectId || typeof value === "string"
}

export function isOfTypeEntity<T extends Entity<any>>(value: Entity<T>): value is T {
	return !isMongooseID(value)
}
