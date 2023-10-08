export * from "./types.js";
export * from "./enums.js";
// import "./express.types.d";

export type ExcludeKeys<T, K extends Array<keyof T>> = Omit<T, K[number]>;
export type ProbablyWithPassword<T> = T & {
  password?: string;
};
