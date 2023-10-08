import {
  HubReceivedType,
  PopulatedDeliveryReceipt,
  PopulatedDeliveryReceiptWithRecipient,
  ShipmentStatuses,
} from "$types";
import { ShippedToHubState } from "./shippedToHub.state.js";
import { DeliveryReceiptStateInterface } from "./state.js";

export class OriginHotspotReceivedState implements DeliveryReceiptStateInterface {
  status = ShipmentStatuses.ORIGIN_HOTSPOT_RECEIVED;
  event?: HubReceivedType;

  constructor(private deliveryReceipt?: PopulatedDeliveryReceiptWithRecipient) {
    this.initEvent();
  }

  getState() {
    return { status: this.status, event: this.event };
  }

  isValidReceipt(deliveryReceipt: PopulatedDeliveryReceipt) {
    const { attributedTo } = deliveryReceipt;
    return attributedTo === "Ride";
  }

  onReceiptConfirmed(deliveryReceipt: PopulatedDeliveryReceiptWithRecipient) {
    const { attributedTo } = deliveryReceipt;

    if (!this.isValidReceipt(deliveryReceipt)) {
      throw new Error(`${attributedTo} cannot receipt this shipment`);
    }

    return new ShippedToHubState(deliveryReceipt);
  }

  private initEvent() {
    if (!this.deliveryReceipt) return;
    const { type, recipient, originator } = this.deliveryReceipt;
    const receiptingHub = type === "Receive" ? recipient.hub : originator.hub;
    if (!receiptingHub) throw new Error("Bad implementation");
    this.event = {
      name: "HUB_RECEIVED",
      date: new Date(),
      hub: receiptingHub,
    };
  }
}
