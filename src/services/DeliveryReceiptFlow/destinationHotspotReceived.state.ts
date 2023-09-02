import { DeliveryReceiptInterface, HubReceivedType, PopulatedEntitiesWrapper, ShipmentStatuses } from "../../types";
import { DeliveryReceiptStateInterface } from "./state";
import { ShippedToDestinationAgency } from "./shippedToDestinationAgency.state";

export class DestinationHotspotReceivedState implements DeliveryReceiptStateInterface {
  status = ShipmentStatuses.DESTINATION_HOTSPOT_RECEIVED;
  event?: HubReceivedType;

  constructor(private deliveryReceipt?: PopulatedEntitiesWrapper<DeliveryReceiptInterface>) {
    this.initEvent();
  }

  getState() {
    return { status: this.status, event: this.event };
  }

  isValidReceipt(deliveryReceipt: DeliveryReceiptInterface) {
    return true;
  }

  onReceiptConfirmed(deliveryReceipt: PopulatedEntitiesWrapper<DeliveryReceiptInterface>) {
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
