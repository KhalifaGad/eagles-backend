import { AgencyReceivedType, PopulatedDeliveryReceipt, ShipmentStatuses } from "$types";
import { DeliveryReceiptStateInterface } from "./state.js";

export class DestinationAgencyReceivedState implements DeliveryReceiptStateInterface {
  status = ShipmentStatuses.DESTINATION_AGENCY_RECEIVED;
  event?: AgencyReceivedType;

  constructor(private deliveryReceipt: PopulatedDeliveryReceipt) {}

  getState() {
    return { status: this.status };
  }

  isValidReceipt() {
    return true;
  }

  onReceiptConfirmed() {
    return this;
  }

  initEvent() {
    return this;
  }
}
