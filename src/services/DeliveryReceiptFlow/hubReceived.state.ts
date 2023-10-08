import {
  DeliveryReceiptAttributedToEnum,
  HubReceivedType,
  PopulatedDeliveryReceipt,
  PopulatedDeliveryReceiptWithRecipient,
  ShipmentStatuses,
} from "$types";
import { ShippedToDestinationAgency } from "./shippedToDestinationAgency.state.js";
import { ShippedToDestinationHotspot } from "./shippedToDestinationHotspot.state.js";
import { DeliveryReceiptStateInterface } from "./state.js";

export class HubReceivedState implements DeliveryReceiptStateInterface {
  status = ShipmentStatuses.HUB_RECEIVED;
  event?: HubReceivedType;

  constructor(private deliveryReceipt?: PopulatedDeliveryReceiptWithRecipient) {
    this.initEvent();
  }

  getState() {
    return { status: this.status, event: this.event };
  }

  isValidReceipt(deliveryReceipt: PopulatedDeliveryReceipt) {
    const { attributedTo } = deliveryReceipt;
    const allowedAttributedTo = [DeliveryReceiptAttributedToEnum.Ride, DeliveryReceiptAttributedToEnum.Agency];

    return allowedAttributedTo.includes(attributedTo as DeliveryReceiptAttributedToEnum);
  }

  onReceiptConfirmed(deliveryReceipt: PopulatedDeliveryReceiptWithRecipient) {
    const { type, attributedTo, recipient, originator } = deliveryReceipt;

    if (!this.isValidReceipt(deliveryReceipt)) {
      throw new Error(`${attributedTo} cannot receipt this shipment`);
    }

    const isGoingToAgency = type === "Receive" ? !!originator.agency : !!recipient.agency;
    return isGoingToAgency
      ? new ShippedToDestinationAgency(deliveryReceipt)
      : new ShippedToDestinationHotspot(deliveryReceipt);
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
