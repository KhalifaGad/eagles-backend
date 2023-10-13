import { isOfTypeEntity } from "$infra";
import {
  DeliveryReceiptPartTypeEnum,
  DeliveryReceiptTypeEnum,
  PopulatedDeliveryReceipt,
  ShipmentStatuses,
} from "$types";
import { HubReceivedState } from "./hubReceived.state.js";
import { OriginHotspotReceivedState } from "./originHotspotReceived.state.js";
import { ShippedToHubState } from "./shippedToHub.state.js";
import { DeliveryReceiptStateInterface } from "./state.js";

export class PlacedState implements DeliveryReceiptStateInterface {
  status = ShipmentStatuses.PLACED;

  constructor(private deliveryReceipt: PopulatedDeliveryReceipt) {}

  getState() {
    return { status: this.status };
  }

  isValidReceipt() {
    const { type, originatorType, recipientType } = this.deliveryReceipt;
    const allowedAttributedTo = [DeliveryReceiptPartTypeEnum.Ride, DeliveryReceiptPartTypeEnum.Hub];
    const partType = type === DeliveryReceiptTypeEnum.Receive ? recipientType : originatorType;
    return allowedAttributedTo.includes(partType);
  }

  onReceiptConfirmed() {
    const { type, recipientType, originatorType, recipientHub, originatorHub } = this.deliveryReceipt;

    if (!this.isValidReceipt()) {
      throw new Error("This shipment cannot be received by the current employee");
    }

    const confirmationPartType = type === DeliveryReceiptTypeEnum.Receive ? recipientType : originatorType;

    if (confirmationPartType === DeliveryReceiptPartTypeEnum.Ride) {
      return new ShippedToHubState(this.deliveryReceipt);
    }

    const receiptingHub = type === DeliveryReceiptTypeEnum.Receive ? recipientHub : originatorHub;

    if (!receiptingHub || !isOfTypeEntity(receiptingHub)) {
      throw new Error("Bad implementation");
    }

    const isReceivedByHotspot = receiptingHub.isHotspot;

    return isReceivedByHotspot
      ? new OriginHotspotReceivedState(this.deliveryReceipt)
      : new HubReceivedState(this.deliveryReceipt);
  }
}
