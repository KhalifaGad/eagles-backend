import {
  DeliveryReceiptPartTypeEnum,
  DeliveryReceiptTypeEnum,
  PopulatedDeliveryReceipt,
  ShipmentEventType,
  ShipmentStatuses,
} from "$types";
import { forbidden } from "~errors/index.js";
import { DeliveryReceiptStateInterface } from "./state.js";

export class ShippedToDestinationAgency implements DeliveryReceiptStateInterface {
  status = ShipmentStatuses.SHIPPED_TO_DESTINATION_AGENCY;
  event?: ShipmentEventType;

  constructor(private deliveryReceipt: PopulatedDeliveryReceipt) {}

  getState() {
    return { status: this.status, event: this.event };
  }

  /**
   * @description: returns true if the shipment recipient of type Agency and agency do exist
   */
  isValidReceipt() {
    const { type, recipientAgency, originatorAgency, recipientType, originatorType } = this.deliveryReceipt;

    const agency = type === DeliveryReceiptTypeEnum.Receive ? recipientAgency : originatorAgency;
    const shipmentRecipientType = type === DeliveryReceiptTypeEnum.Receive ? recipientType : originatorType;

    return !!agency && shipmentRecipientType === DeliveryReceiptPartTypeEnum.Agency;
  }

  onReceiptConfirmed() {
    if (!this.isValidReceipt()) {
      throw forbidden("لا يمكن استلام الشحنة من قبل وكالة");
    }

    this.addDestinationAgencyReceivedEvent();
    return this;
  }

  private addDestinationAgencyReceivedEvent() {
    const { type, recipient, originator, recipientAgency, originatorAgency } = this.deliveryReceipt;

    const employee = type === DeliveryReceiptTypeEnum.Receive ? recipient : originator;
    const agency = type === DeliveryReceiptTypeEnum.Receive ? recipientAgency : originatorAgency;

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
