import {
  DeliveryReceiptPartTypeEnum,
  DeliveryReceiptTypeEnum,
  PopulatedDeliveryReceipt,
  ShipmentEventType,
  ShipmentInterface,
  ShipmentStatuses,
} from "$types";
import { forbidden } from "~errors/index.js";
import { DeliveryReceiptStateInterface } from "./state.js";

export class HubReceivedState implements DeliveryReceiptStateInterface {
  status = ShipmentStatuses.HUB_RECEIVED;
  event?: ShipmentEventType;

  constructor(
    private readonly shipment: ShipmentInterface,
    private readonly deliveryReceipt: PopulatedDeliveryReceipt
  ) {}

  getState() {
    return { status: this.status, event: this.event };
  }

  /**
   * @description: returns true if the shipment recipient of type Ride or Agency
   */
  isValidReceipt() {
    const { type, originatorType, recipientType } = this.deliveryReceipt;
    const allowedAttributedTo = [DeliveryReceiptPartTypeEnum.Ride, DeliveryReceiptPartTypeEnum.Agency];

    const shipmentRecipient = type === DeliveryReceiptTypeEnum.Receive ? originatorType : recipientType;

    return allowedAttributedTo.includes(shipmentRecipient);
  }

  onReceiptConfirmed() {
    if (!this.isValidReceipt()) {
      throw forbidden("لا يمكن استلام الشحنة من قبل الموظف الحالي");
    }

    const hasDestinationHotspot = !!this.shipment.destinationHotspot;

    if (!hasDestinationHotspot) {
      this.addShippedToDestinationAgencyEvent();
      return this;
    }

    this.addShippedToDestinationHotspotEvent();
    return this;
  }

  private addShippedToDestinationAgencyEvent() {
    const { type, recipient, originator } = this.deliveryReceipt;

    const employee = type === DeliveryReceiptTypeEnum.Receive ? recipient : originator;

    if (!employee?._id) throw forbidden("لا يمكن استلام الشحنة من قبل الموظف الحالي");

    this.status = ShipmentStatuses.SHIPPED_TO_DESTINATION_AGENCY;

    this.event = {
      name: "SHIPPED",
      date: new Date(),
      destinationType: "AGENCY",
      employee: employee._id,
    };
  }

  private addShippedToDestinationHotspotEvent() {
    const { type, recipient, originator } = this.deliveryReceipt;

    const employee = type === DeliveryReceiptTypeEnum.Receive ? recipient : originator;

    if (!employee?._id) throw forbidden("لا يمكن استلام الشحنة من قبل الموظف الحالي");

    this.status = ShipmentStatuses.SHIPPED_TO_DESTINATION_HOTSPOT;

    this.event = {
      name: "SHIPPED",
      date: new Date(),
      destinationType: "HUB",
      employee: employee._id,
    };
  }
}
