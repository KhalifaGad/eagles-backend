import { DeliveryReceiptInterface } from "$types";
import { DeliveryReceiptModel } from "../models/index.js";
import DefaultRepository from "./default.repository.js";

class DeliveryReceiptRepository extends DefaultRepository<DeliveryReceiptInterface> {
  constructor() {
    super(DeliveryReceiptModel, [
      { path: "recipient" },
      { path: "recipientHub" },
      { path: "recipientAgency" },
      { path: "originator" },
      { path: "originatorHub" },
      { path: "originatorAgency" },
      {
        path: "shipments",
        populate: [
          { path: "consignee", populate: { path: "address.city" } },
          { path: "consignor", populate: { path: "address.city" } },
        ],
      },
    ]);
  }
}

export default new DeliveryReceiptRepository();
