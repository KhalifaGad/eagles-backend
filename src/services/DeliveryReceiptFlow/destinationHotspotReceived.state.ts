import {
  DeliveryReceiptInterface,
  HubReceivedType,
  PopulatedDeliveryReceipt,
  PopulatedDeliveryReceiptWithRecipient,
  PopulatedEntitiesWrapper,
  ShipmentStatuses,
  WithRelation,
} from "$types";
import { ShippedToDestinationAgency } from "./shippedToDestinationAgency.state.js";
import { DeliveryReceiptStateInterface } from "./state.js";

export class DestinationHotspotReceivedState implements DeliveryReceiptStateInterface {
  status = ShipmentStatuses.DESTINATION_HOTSPOT_RECEIVED;
  event?: HubReceivedType;

  constructor(private deliveryReceipt?: PopulatedEntitiesWrapper<WithRelation<DeliveryReceiptInterface, "recipient">>) {
    this.initEvent();
  }

  getState() {
    return { status: this.status, event: this.event };
  }

  isValidReceipt(deliveryReceipt: PopulatedDeliveryReceipt) {
    return true;
  }

  onReceiptConfirmed(deliveryReceipt: PopulatedDeliveryReceiptWithRecipient) {
    const { type, attributedTo, recipient, originator } = deliveryReceipt;

    if (attributedTo === "Hub") throw new Error(`${attributedTo} cannot receipt this shipment`);

    const isGoingToAgency = type === "Receive" ? !!originator.agency : !!recipient.agency;

    if (!isGoingToAgency) throw new Error("This shipment should picked up by agency employee");

    return new ShippedToDestinationAgency(deliveryReceipt);
  }

  private initEvent() {
    if (!this.deliveryReceipt) return;
    const { type, recipient, originator } = this.deliveryReceipt;
    const receiptingHub = type === "Receive" ? recipient.hub : originator.hub;
    if (!receiptingHub) throw new Error("Bad implementation");
    this.event = {
      name: "HOTSPOT_RECEIVED",
      date: new Date(),
      hub: receiptingHub,
    };
  }
}
