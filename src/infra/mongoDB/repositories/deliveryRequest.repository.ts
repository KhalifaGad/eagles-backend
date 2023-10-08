import { DeliveryReceiptInterface } from "$types";
import { DeliveryReceiptModel } from "../models/index.js";
import DefaultRepository from "./default.repository.js";

class DeliveryReceiptRepository extends DefaultRepository<DeliveryReceiptInterface> {
  constructor() {
    super(DeliveryReceiptModel, [
      { path: "recipient" },
      { path: "originator" },
      {
        path: "shipme.js",
        populate: [
          { path: "consignee", populate: { path: "address.city" } },
          { path: "consignor", populate: { path: "address.city" } },
        ],
      },
    ]);
  }
}

export default new DeliveryReceiptRepository();
