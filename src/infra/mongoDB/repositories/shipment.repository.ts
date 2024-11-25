import { ListArgumentsInterface, ShipmentInterface } from "$types";
import { FilterQuery } from "mongoose";
import { buildListOptions } from "~infra/index.js";
import { ShipmentModel } from "../models/index.js";
import DefaultRepository from "./default.repository.js";

const population = [
  { path: "consignee", populate: { path: "address", populate: { path: "city" } } },
  { path: "consignor", populate: { path: "address.city" } },
  { path: "originAgency", populate: { path: "address.city" } },
  { path: "destinationAgency", populate: { path: "address.city" } },
  { path: "originHotspot" },
  { path: "destinationHotspot" },
  { path: "hub" },
  { path: "events.employee", populate: { path: "address.city" } },
  { path: "events.products" },
];

class ShipmentRepository extends DefaultRepository<ShipmentInterface> {
  constructor() {
    super(ShipmentModel, population);
  }

  async list(
    payload: ListArgumentsInterface<ShipmentInterface> & {
      filter: ListArgumentsInterface<ShipmentInterface>["filter"] & {
        search?: string;
        agency?: string;
        searchHub?: string;
      };
    }
  ) {
    const { filter, options } = payload;
    const {
      search,
      code,
      status,
      hub,
      searchHub,
      destinationAgency,
      destinationHotspot,
      originHotspot,
      originAgency,
      agency,
    } = filter;
    const { page = 0, pageLimit = 0, sortBy, sortDirection } = buildListOptions(options ?? {});
    const query: FilterQuery<ShipmentInterface> = {
      code,
      hub,
      ...(status && { status: Array.isArray(status) ? { $in: status } : status }),
      ...(searchHub && { $or: [{ hub: searchHub }, { originHotspot: searchHub }, { destinationHotspot: searchHub }] }),
      ...(agency && { $or: [{ originAgency: agency }, { destinationAgency: agency }] }),
      destinationAgency,
      originAgency,
      destinationHotspot,
      originHotspot,
      ...(search && {
        $or: [
          { referenceNumber: search },
          { code: search },
          { "searchables.consignorName": { $regex: search, $options: "i" } },
          { "searchables.consigneeName": { $regex: search, $options: "i" } },
          { "searchables.consignorMobile": { $regex: search, $options: "i" } },
          { "searchables.consigneeMobile": { $regex: search, $options: "i" } },
          { "searchables.originAgencyName": { $regex: search, $options: "i" } },
          { "searchables.destinationAgencyName": { $regex: search, $options: "i" } },
        ],
      }),
    };

    const parsedQuery = JSON.parse(JSON.stringify(query));
    const listQuery = this.model
      .find(parsedQuery)
      .populate(population)
      .sort({ [sortBy ?? "createdAt"]: sortDirection === "desc" ? 1 : -1 })
      .skip(page * pageLimit)
      .limit(pageLimit);

    const [data, totalCount] = await Promise.all([listQuery.exec(), this.count(parsedQuery)]);

    return {
      data,
      totalCount,
    };
  }
}

export default new ShipmentRepository();
