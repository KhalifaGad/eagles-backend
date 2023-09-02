import { ShippedToDestinationHotspot } from "./shippedToDestinationHotspot.state";
import { ShippedToDestinationAgency } from "./shippedToDestinationAgency.state";
import {
  DeliveryReceiptAttributedToEnum,
  DeliveryReceiptInterface,
  HubReceivedType,
  PopulatedEntitiesWrapper,
  ShipmentStatuses,
} from "../../types";
import { DeliveryReceiptStateInterface } from "./state";

export class HubReceivedState implements DeliveryReceiptStateInterface {
  status = ShipmentStatuses.HUB_RECEIVED;
  event?: HubReceivedType;

  constructor(private deliveryReceipt?: PopulatedEntitiesWrapper<DeliveryReceiptInterface>) {
    this.initEvent();
  }

  getState() {
    return { status: this.status, event: this.event };
  }

  isValidReceipt(deliveryReceipt: DeliveryReceiptInterface) {
    const { attributedTo } = deliveryReceipt;
    const allowedAttributedTo = [DeliveryReceiptAttributedToEnum.Ride, DeliveryReceiptAttributedToEnum.Agency];

    return allowedAttributedTo.includes(attributedTo as DeliveryReceiptAttributedToEnum);
  }

  onReceiptConfirmed(deliveryReceipt: PopulatedEntitiesWrapper<DeliveryReceiptInterface>) {
    const { type, attributedTo, recipient, originator } = deliveryReceipt;

    if (!this.isValidReceipt(deliveryReceipt as DeliveryReceiptInterface))
      {throw new Error(`${attributedTo} cannot receipt this shipment`);}

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
