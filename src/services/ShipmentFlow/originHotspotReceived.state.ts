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

  constructor(private deliveryReceipt: PopulatedDeliveryReceipt) {}

  getState() {
    return { status: this.status, event: this.event };
  }

  /**
   * @description: returns true if the shipment recipient of type Ride
   */
  isValidReceipt() {
    const { type, originatorType, recipientType } = this.deliveryReceipt;
    const confirmationPartType = type === DeliveryReceiptTypeEnum.Receive ? originatorType : recipientType;
    return confirmationPartType === DeliveryReceiptPartTypeEnum.Ride;
  }

  onReceiptConfirmed() {
    if (!this.isValidReceipt()) {
      throw new Error("Cannot confirm this receipt by the current employee");
    }

    return new ShippedToHubState(this.deliveryReceipt);
  }

  initEvent() {
    const { type, recipientHub, originatorHub } = this.deliveryReceipt;
    const receiptingHub = type === DeliveryReceiptTypeEnum.Receive ? recipientHub : originatorHub;
    if (!receiptingHub) throw new Error("Bad implementation");
    this.event = {
      name: "HOTSPOT_RECEIVED",
      date: new Date(),
      hub: receiptingHub,
    };
    return this;
  }
}
