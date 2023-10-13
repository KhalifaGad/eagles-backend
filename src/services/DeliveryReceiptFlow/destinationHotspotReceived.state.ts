import { DeliveryReceiptPartTypeEnum, HubReceivedType, PopulatedDeliveryReceipt, ShipmentStatuses } from "$types";
import { ShippedToDestinationAgency } from "./shippedToDestinationAgency.state.js";
import { DeliveryReceiptStateInterface } from "./state.js";

export class DestinationHotspotReceivedState implements DeliveryReceiptStateInterface {
  status = ShipmentStatuses.DESTINATION_HOTSPOT_RECEIVED;
  event?: HubReceivedType;

  constructor(private deliveryReceipt: PopulatedDeliveryReceipt) {
    this.initEvent();
  }

  getState() {
    return { status: this.status, event: this.event };
  }

  isValidReceipt() {
    return true;
  }

  onReceiptConfirmed() {
    const { type, originatorType, recipientAgency, originatorAgency } = this.deliveryReceipt;

    // An originator cannot confirm his own receipt
    if (originatorType === DeliveryReceiptPartTypeEnum.Hub) {
      throw new Error("Hub cannot receipt this shipment");
    }

    const isGoingToAgency = type === "Receive" ? !!originatorAgency : !!recipientAgency;

    if (!isGoingToAgency) throw new Error("This shipment should picked up by agency employee");

    return new ShippedToDestinationAgency(this.deliveryReceipt);
  }

  private initEvent() {
    if (!this.deliveryReceipt) return;
    const { type, recipientHub, originatorHub } = this.deliveryReceipt;
    const receiptingHub = type === "Receive" ? recipientHub : originatorHub;
    if (!receiptingHub) throw new Error("Bad implementation");
    this.event = {
      name: "HOTSPOT_RECEIVED",
      date: new Date(),
      hub: receiptingHub,
    };
  }
}
