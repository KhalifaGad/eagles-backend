import { Entity } from "$types";

export const getEntityRef = <T>(entity: Entity<T>) => {
  return typeof entity === "string" ? entity : entity._id;
};
