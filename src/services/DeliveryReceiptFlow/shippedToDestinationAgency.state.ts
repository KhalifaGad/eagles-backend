import {
  PopulatedDeliveryReceipt,
  PopulatedDeliveryReceiptWithRecipient,
  ShipmentStatuses,
  ShippedType,
} from "$types";
import { DeliveryReceiptStateInterface } from "./state.js";

export class ShippedToDestinationAgency implements DeliveryReceiptStateInterface {
  status = ShipmentStatuses.SHIPPED_TO_DESTINATION_AGENCY;
  event?: ShippedType;

  constructor(private deliveryReceipt?: PopulatedDeliveryReceiptWithRecipient) {
    this.initEvent();
  }

  getState() {
    return { status: this.status };
  }

  isValidReceipt(deliveryReceipt: PopulatedDeliveryReceipt) {
    return true;
  }

  onReceiptConfirmed(deliveryReceipt: PopulatedDeliveryReceiptWithRecipient) {
    return this;
  }

  private initEvent() {
    if (!this.deliveryReceipt) return;
    const { type, recipient, originator } = this.deliveryReceipt;

    const employee = type === "Receive" ? recipient : originator;

    if (!employee._id) throw new Error("Bad implementation");

    this.event = {
      name: "SHIPPED",
      date: new Date(),
      destinationType: "HUB",
      employee: employee._id,
    };
  }
}
