import {
  DeliveryReceiptInterface,
  HubReceivedType,
  PopulatedEntitiesWrapper,
  ShipmentStatuses,
} from "../../types";
import { DeliveryReceiptStateInterface } from "./state";
import { ShippedToHubState } from "./shippedToHub.state"

export class OriginHotspotReceivedState implements DeliveryReceiptStateInterface {
  status = ShipmentStatuses.ORIGIN_HOTSPOT_RECEIVED;
  event?: HubReceivedType;

  constructor(private deliveryReceipt?: PopulatedEntitiesWrapper<DeliveryReceiptInterface>) {
      this.initEvent();
  }

  getState() {
    return { status: this.status, event: this.event };
  }

  isValidReceipt(deliveryReceipt: DeliveryReceiptInterface) {
    const { attributedTo } = deliveryReceipt;
    return attributedTo === "Ride";
  }

  onReceiptConfirmed(deliveryReceipt: PopulatedEntitiesWrapper<DeliveryReceiptInterface>) {
    const { attributedTo } = deliveryReceipt;

    if (!this.isValidReceipt(deliveryReceipt as DeliveryReceiptInterface)) throw new Error(`${attributedTo} cannot receipt this shipment`);

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
