import {
  DeliveryReceiptPartTypeEnum,
  DeliveryReceiptTypeEnum,
  PopulatedDeliveryReceipt,
  ShipmentEventType,
  ShipmentStatuses,
} from "$types";
import { forbidden } from "~errors/index.js";
import { ShippedToHubState } from "./shippedToHub.state.js";
import { DeliveryReceiptStateInterface } from "./state.js";

export class OriginHotspotReceivedState implements DeliveryReceiptStateInterface {
  status = ShipmentStatuses.ORIGIN_HOTSPOT_RECEIVED;
  event?: ShipmentEventType;

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

    const { type, recipient, originator } = this.deliveryReceipt;
    const employee = type === DeliveryReceiptTypeEnum.Receive ? recipient : originator;
    if (!employee?._id) throw forbidden("لا يمكن استلام الشحنة من قبل الموظف الحالي");

    this.status = ShipmentStatuses.SHIPPED_TO_HUB;

    this.event = {
      name: "SHIPPED",
      date: new Date(),
      destinationType: "HUB",
      employee: employee._id,
    };

    return this;
  }

  // initEvent() {
  //   const { type, recipientHub, originatorHub } = this.deliveryReceipt;
  //   const receiptingHub = type === DeliveryReceiptTypeEnum.Receive ? recipientHub : originatorHub;
  //   if (!receiptingHub) throw new Error("Bad implementation");
  //   this.event = {
  //     name: "HOTSPOT_RECEIVED",
  //     date: new Date(),
  //     hub: receiptingHub,
  //   };
  //   return this;
  // }
}
