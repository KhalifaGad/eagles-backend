import { Entity } from "$types";

export function isOfTypeEntity<T extends Entity<unknown>>(value: Entity<T>): value is T {
  return !(typeof value === "string");
}
