import { ExcludeKeys } from "$types";

export function destroyProperties<T, K extends Array<keyof T>>(obj: T, keys: K): ExcludeKeys<T, K> {
  const result = { ...obj };
  keys.forEach(key => {
    delete result[key];
  });
  return result;
}
