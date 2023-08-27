import { Entity } from "../types";

export const getEntityRef = <T>(enityt: Entity<T>) => {
	return typeof enityt === "string" ? enityt : enityt._id;
}
