import {
  DeliveryReceiptPartTypeEnum,
  DeliveryReceiptTypeEnum,
  HubReceivedType,
  PopulatedDeliveryReceipt,
  ShipmentStatuses,
} from "$types";
import { ShippedToDestinationAgency } from "./shippedToDestinationAgency.state.js";
import { ShippedToDestinationHotspot } from "./shippedToDestinationHotspot.state.js";
import { DeliveryReceiptStateInterface } from "./state.js";

export class HubReceivedState implements DeliveryReceiptStateInterface {
  status = ShipmentStatuses.HUB_RECEIVED;
  event?: HubReceivedType;

  constructor(private deliveryReceipt: PopulatedDeliveryReceipt) {
    this.initEvent();
  }

  getState() {
    return { status: this.status, event: this.event };
  }

  isValidReceipt() {
    const { type, originatorType, recipientType } = this.deliveryReceipt;
    const allowedAttributedTo = [DeliveryReceiptPartTypeEnum.Ride, DeliveryReceiptPartTypeEnum.Agency];

    const confirmationPartType = type === DeliveryReceiptTypeEnum.Receive ? recipientType : originatorType;

    return allowedAttributedTo.includes(confirmationPartType);
  }

  onReceiptConfirmed() {
    const { type, recipientAgency, originatorAgency } = this.deliveryReceipt;

    if (!this.isValidReceipt()) {
      throw new Error("Cannot confirm this receipt by the current employee");
    }

    const isGoingToAgency = type === DeliveryReceiptTypeEnum.Receive ? !!originatorAgency : !!recipientAgency;
    return isGoingToAgency
      ? new ShippedToDestinationAgency(this.deliveryReceipt)
      : new ShippedToDestinationHotspot(this.deliveryReceipt);
  }

  private initEvent() {
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
