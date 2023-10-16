import { isOfTypeEntity } from "$infra";
import {
  DeliveryReceiptPartTypeEnum,
  DeliveryReceiptTypeEnum,
  PopulatedDeliveryReceipt,
  ShipmentEventType,
  ShipmentStatuses,
} from "$types";
import { DeliveryReceiptStateInterface } from "./state.js";

export class PlacedState implements DeliveryReceiptStateInterface {
  status = ShipmentStatuses.PLACED;
  event?: ShipmentEventType;

  constructor(private deliveryReceipt: PopulatedDeliveryReceipt) {}

  getState() {
    return { status: this.status, event: this.event };
  }

  /**
   * @description: returns true if the shipment recipient of type Ride or Hub
   */
  isValidReceipt() {
    const { type, originatorType, recipientType } = this.deliveryReceipt;
    const allowedAttributedTo = [DeliveryReceiptPartTypeEnum.Ride, DeliveryReceiptPartTypeEnum.Hub];
    const shipmentRecipient = type === DeliveryReceiptTypeEnum.Receive ? originatorType : recipientType;
    return allowedAttributedTo.includes(shipmentRecipient);
  }

  onReceiptConfirmed() {
    const { type, recipientType, originatorType, recipientHub, originatorHub } = this.deliveryReceipt;

    if (!this.isValidReceipt()) {
      throw new Error("This shipment cannot be received by the current employee");
    }
    const shipmentRecipientType = type === DeliveryReceiptTypeEnum.Receive ? recipientType : originatorType;

    if (shipmentRecipientType === DeliveryReceiptPartTypeEnum.Ride) {
      this.addShippedToHubEvent();
      return this;
    }

    const receiptingHub = type === DeliveryReceiptTypeEnum.Receive ? originatorHub : recipientHub;

    if (!receiptingHub || !isOfTypeEntity(receiptingHub)) {
      throw new Error("Bad implementation");
    }

    const isReceivedByHotspot = receiptingHub.isHotspot;

    if (isReceivedByHotspot) {
      this.addOriginHotspotReceivedEvent();
      return this;
    }

    this.addHubReceivedEvent();
    return this;
  }

  private addShippedToHubEvent() {
    const { type, recipient, originator } = this.deliveryReceipt;

    const employee = type === DeliveryReceiptTypeEnum.Receive ? recipient : originator;

    if (!employee?._id) throw new Error("Bad implementation");

    this.status = ShipmentStatuses.SHIPPED_TO_HUB;

    this.event = {
      name: "SHIPPED",
      date: new Date(),
      destinationType: "HUB",
      employee: employee._id,
    };
  }

  private addOriginHotspotReceivedEvent() {
    const { type, recipientHub, originatorHub } = this.deliveryReceipt;
    const receiptingHub = type === DeliveryReceiptTypeEnum.Receive ? recipientHub : originatorHub;
    if (!receiptingHub) throw new Error("Bad implementation");

    this.status = ShipmentStatuses.ORIGIN_HOTSPOT_RECEIVED;

    this.event = {
      name: "HOTSPOT_RECEIVED",
      date: new Date(),
      hub: receiptingHub,
    };
  }

  private addHubReceivedEvent() {
    const { type, recipientHub, originatorHub } = this.deliveryReceipt;
    const receiptingHub = type === DeliveryReceiptTypeEnum.Receive ? originatorHub : recipientHub;
    if (!receiptingHub) throw new Error("Bad implementation");

    this.status = ShipmentStatuses.HUB_RECEIVED;

    this.event = {
      name: "HUB_RECEIVED",
      date: new Date(),
      hub: receiptingHub,
    };
  }
}
