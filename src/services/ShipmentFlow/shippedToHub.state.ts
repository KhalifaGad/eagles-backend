import {
  DeliveryReceiptPartTypeEnum,
  DeliveryReceiptTypeEnum,
  PopulatedDeliveryReceipt,
  ShipmentEventType,
  ShipmentStatuses,
} from "$types";
import { forbidden } from "~errors/index.js";
import { DeliveryReceiptStateInterface } from "./state.js";

export class ShippedToHubState implements DeliveryReceiptStateInterface {
  status = ShipmentStatuses.SHIPPED_TO_HUB;
  event?: ShipmentEventType;

  constructor(private deliveryReceipt: PopulatedDeliveryReceipt) {}

  getState() {
    return { status: this.status, event: this.event };
  }

  /**
   * @description: returns true if the shipment recipient of type Hub
   */
  isValidReceipt() {
    const { type, recipientType, originatorType } = this.deliveryReceipt;

    const shipmentRecipientType = type === DeliveryReceiptTypeEnum.Receive ? originatorType : recipientType;

    return shipmentRecipientType === DeliveryReceiptPartTypeEnum.Hub;
  }

  onReceiptConfirmed() {
    if (!this.isValidReceipt()) {
      throw forbidden("لا يمكن استلام الشحنة الا من قبل المستودع");
    }

    this.addEvent();
    return this;
  }

  addEvent() {
    const { type, recipientHub, originatorHub } = this.deliveryReceipt;
    const receiptingHub = type === DeliveryReceiptTypeEnum.Receive ? originatorHub : recipientHub;
    if (!receiptingHub) throw forbidden("لا يمكن استلام الشحنة الا من موظف بالمستودع");

    this.status = ShipmentStatuses.HUB_RECEIVED;

    this.event = {
      name: "HUB_RECEIVED",
      date: new Date(),
      hub: receiptingHub,
    };
  }
}
