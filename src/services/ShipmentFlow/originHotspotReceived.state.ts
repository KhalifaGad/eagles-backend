import {
  DeliveryReceiptPartTypeEnum,
  DeliveryReceiptTypeEnum,
  HubReceivedType,
  PopulatedDeliveryReceipt,
  ShipmentStatuses,
} from "$types";
import { ShippedToHubState } from "./shippedToHub.state.js";
import { DeliveryReceiptStateInterface } from "./state.js";

export class OriginHotspotReceivedState implements DeliveryReceiptStateInterface {
  status = ShipmentStatuses.ORIGIN_HOTSPOT_RECEIVED;
  event?: HubReceivedType;

  constructor(private deliveryReceipt: PopulatedDeliveryReceipt) {
    this.initEvent();
  }

  getState() {
    return { status: this.status, event: this.event };
  }

  isValidReceipt() {
    const { type, originatorType, recipientType } = this.deliveryReceipt;
    const confirmationPartType = type === DeliveryReceiptTypeEnum.Receive ? recipientType : originatorType;
    return confirmationPartType === DeliveryReceiptPartTypeEnum.Ride;
  }

  onReceiptConfirmed() {
    if (!this.isValidReceipt()) {
      throw new Error("Cannot confirm this receipt by the current employee");
    }

    return new ShippedToHubState(this.deliveryReceipt);
  }

  private initEvent() {
    if (!this.deliveryReceipt) return;
    const { type, recipientHub, originatorHub } = this.deliveryReceipt;
    const receiptingHub = type === "Receive" ? recipientHub : originatorHub;
    if (!receiptingHub) throw new Error("Bad implementation");
    this.event = {
      name: "HUB_RECEIVED",
      date: new Date(),
      hub: receiptingHub,
    };
  }
}
