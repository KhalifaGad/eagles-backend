export * from "./types";
export * from "./enums";

export type ExcludeKeys<T, K extends Array<keyof T>> = Omit<T, K[number]>;
