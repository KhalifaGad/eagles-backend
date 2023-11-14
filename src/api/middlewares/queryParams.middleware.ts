import { NextFunction, Request, Response } from "express";

const parser = (stringifiedJSON: string) => {
  try {
    const jsonValue = JSON.parse(stringifiedJSON);
    return typeof jsonValue === "number" ? stringifiedJSON : jsonValue;
  } catch {
    return stringifiedJSON;
  }
};

export default (req: Request, _res: Response, next: NextFunction) => {
  const optionsFields = ["page", "pageLimit", "sortBy", "sortDirection", "showAll"];

  const groupedKeys = req.query.groupedKeys as string[];
  let groupedFilter: Record<string, any> | null = null;

  if (groupedKeys && Array.isArray(groupedKeys) && groupedKeys.length > 0) {
    groupedKeys.forEach(key => {
      if (!groupedFilter) groupedFilter = {};
      groupedFilter[key] = req.query[key];
      delete req.query[key];
    });
  }

  const preparedQuery = Object.keys(req.query).reduce((accumulator, key) => {
    const accumulatorKey = (optionsFields.includes(key) ? "options" : "filter") as keyof typeof accumulator;

    return Object.assign(accumulator, {
      [accumulatorKey]: {
        ...((accumulator[accumulatorKey] as object) || {}),
        [key]: parser(req.query[key] as string),
      },
    });
  }, {} as Record<string, any>);

  if (!groupedFilter) {
    req.query = preparedQuery;
  } else {
    const filter = preparedQuery.filter ?? {};
    req.query = {
      ...preparedQuery,
      filter: {
        ...filter,
        groupedFilter,
      },
    };
  }

  next();
};
