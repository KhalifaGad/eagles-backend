import { Request, Response, NextFunction } from "express";

const parser = (stringifiedJSON: string) => {
  try {
    const jsonValue =  JSON.parse(stringifiedJSON);
    return typeof jsonValue === "number" ? stringifiedJSON : jsonValue;
  } catch {
    return stringifiedJSON;
  }
};

export default (req: Request, _res: Response, next: NextFunction) => {
  const optionsFields = ["page", "pageLimit", "sortBy", "sortDirection", "showAll"];

  req.query = Object.keys(req.query).reduce((accumulator, key) => {
    const accumulatorKey = (optionsFields.includes(key) ? "options" : "filter") as keyof typeof accumulator;

    return Object.assign(accumulator, {
      [accumulatorKey]: {
        ...((accumulator[accumulatorKey] as object) || {}),
        [key]: parser(req.query[key] as string),
      },
    });
  }, {});

  next();
};
