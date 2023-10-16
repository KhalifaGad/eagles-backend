import { isOfTypeEntity } from "$infra";
import { DeliveryReceiptTypeEnum, PopulatedDeliveryReceipt, ShipmentEventType, ShipmentStatuses } from "$types";
import { forbidden } from "~errors/index.js";
import { DeliveryReceiptStateInterface } from "./state.js";

export class ShippedToDestinationHotspot implements DeliveryReceiptStateInterface {
  status = ShipmentStatuses.SHIPPED_TO_DESTINATION_HOTSPOT;
  event?: ShipmentEventType;

  constructor(private deliveryReceipt: PopulatedDeliveryReceipt) {}

  getState() {
    return { status: this.status, event: this.event };
  }

  /**
   * @description: returns true if the shipment recipient of type Hotspot
   */
  isValidReceipt() {
    const { type, recipientHub, originatorHub } = this.deliveryReceipt;

    const hub = type === DeliveryReceiptTypeEnum.Receive ? recipientHub : originatorHub;

    if (!hub) return false;
    if (!isOfTypeEntity(hub)) throw new Error("Bad implementation");

    return hub.isHotspot;
  }

  onReceiptConfirmed() {
    if (this.isValidReceipt()) {
      throw forbidden("يمكن استلام الشحنة الا من قبل نقطة توزيع");
    }

    this.addDestinationHotspotReceivedEvent();
    return this;
  }

  addDestinationHotspotReceivedEvent() {
    const { type, recipientHub, originatorHub } = this.deliveryReceipt;
    const receiptingHub = type === DeliveryReceiptTypeEnum.Receive ? recipientHub : originatorHub;
    if (!receiptingHub) throw forbidden("يمكن استلام الشحنة الا من قبل نقطة توزيع");

    this.status = ShipmentStatuses.DESTINATION_HOTSPOT_RECEIVED;

    this.event = {
      name: "HOTSPOT_RECEIVED",
      date: new Date(),
      hub: receiptingHub,
    };
  }
}
