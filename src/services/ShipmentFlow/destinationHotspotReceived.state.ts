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

export class DestinationHotspotReceivedState implements DeliveryReceiptStateInterface {
  status = ShipmentStatuses.DESTINATION_HOTSPOT_RECEIVED;
  event?: ShipmentEventType;

  constructor(private readonly shipment: ShipmentInterface, private deliveryReceipt: PopulatedDeliveryReceipt) {}

  getState() {
    return { status: this.status, event: this.event };
  }

  /**
   * @description: returns true if the shipment recipient of type Agency and agency do exist
   */
  isValidReceipt() {
    const { type, recipientAgency, originatorAgency, recipientType, originatorType } = this.deliveryReceipt;

    const agency = type === DeliveryReceiptTypeEnum.Delivery ? recipientAgency : originatorAgency;
    const shipmentRecipientType = type === DeliveryReceiptTypeEnum.Delivery ? recipientType : originatorType;

    if (!agency || agency._id?.toString() !== this.shipment.destinationAgency?._id?.toString()) {
      return false;
    }

    return shipmentRecipientType === DeliveryReceiptPartTypeEnum.Agency;
  }

  onReceiptConfirmed() {
    if (!this.isValidReceipt()) {
      throw forbidden("لا يمكن استلام الشحنة الا من قبل وكالة");
    }

    this.addDestinationAgencyReceivedEvent();
    return this;
  }

  private addDestinationAgencyReceivedEvent() {
    const { type, recipient, originator, recipientAgency, originatorAgency } = this.deliveryReceipt;

    const agency = type === DeliveryReceiptTypeEnum.Delivery ? recipientAgency : originatorAgency;
    const employee = type === DeliveryReceiptTypeEnum.Delivery ? recipient : originator;

    if (!employee?._id) throw forbidden("لا يمكن استلام الشحنة من قبل الموظف الحالي");
    if (!agency?._id) throw forbidden("لا يمكن استلام الشحنة من قبل الوكاله الحاليه");

    this.status = ShipmentStatuses.DESTINATION_AGENCY_RECEIVED;

    this.event = {
      name: "AGENCY_RECEIVED",
      date: new Date(),
      agency: agency._id,
      employee: employee._id,
    };
  }
}
