import { isOfTypeEntity } from "$infra";
import {
  DeliveryReceiptTypeEnum,
  PopulatedDeliveryReceipt,
  ShipmentEventType,
  ShipmentInterface,
  ShipmentStatuses,
} from "$types";
import { Types as MongooseTypes } from "mongoose";
import { forbidden } from "~errors/index.js";
import { DeliveryReceiptStateInterface } from "./state.js";

export class ShippedToDestinationHotspot implements DeliveryReceiptStateInterface {
  status = ShipmentStatuses.SHIPPED_TO_DESTINATION_HOTSPOT;
  event?: ShipmentEventType;

  constructor(
    private readonly shipment: ShipmentInterface,
    private readonly deliveryReceipt: PopulatedDeliveryReceipt
  ) {}

  getState() {
    return { status: this.status, event: this.event };
  }

  /**
   * @description: returns true if the shipment recipient of type Hotspot
   */
  isValidReceipt() {
    const { type, recipientHub, originatorHub } = this.deliveryReceipt;
    const { destinationHotspot } = this.shipment;

    const hub = type === DeliveryReceiptTypeEnum.Delivery ? recipientHub : originatorHub;

    if (!hub) return false;
    if (!isOfTypeEntity(hub)) throw new Error("Bad implementation");

    const destinationHotspotId = destinationHotspot?._id ?? destinationHotspot;

    return hub.isHotspot && hub?._id?.toString() === destinationHotspotId?.toString();
  }

  onReceiptConfirmed() {
    if (!this.isValidReceipt()) {
      throw forbidden("يمكن استلام الشحنة الا من قبل نقطة توزيع");
    }

    this.addDestinationHotspotReceivedEvent();
    return this;
  }

  addDestinationHotspotReceivedEvent() {
    const { type, recipientHub, originatorHub } = this.deliveryReceipt;
    const receiptingHub = type === DeliveryReceiptTypeEnum.Delivery ? recipientHub : originatorHub;
    if (!receiptingHub) throw forbidden("يمكن استلام الشحنة الا من قبل نقطة توزيع");

    this.status = ShipmentStatuses.DESTINATION_HOTSPOT_RECEIVED;

    this.event = {
      name: "HOTSPOT_RECEIVED",
      date: new Date(),
      hub: receiptingHub,
    };
  }
}
