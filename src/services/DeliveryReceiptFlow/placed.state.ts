import { isOfTypeEntity } from "$infra";
import {
  DeliveryReceiptAttributedToEnum,
  PopulatedDeliveryReceipt,
  PopulatedDeliveryReceiptWithRecipient,
  ShipmentStatuses,
} from "$types";
import { HubReceivedState } from "./hubReceived.state.js";
import { OriginHotspotReceivedState } from "./originHotspotReceived.state.js";
import { ShippedToHubState } from "./shippedToHub.state.js";
import { DeliveryReceiptStateInterface } from "./state.js";

export class PlacedState implements DeliveryReceiptStateInterface {
  status = ShipmentStatuses.PLACED;

  getState() {
    return { status: this.status };
  }

  isValidReceipt(deliveryReceipt: PopulatedDeliveryReceipt) {
    const { attributedTo } = deliveryReceipt;
    const allowedAttributedTo = [DeliveryReceiptAttributedToEnum.Ride, DeliveryReceiptAttributedToEnum.Hub];
    return allowedAttributedTo.includes(attributedTo as DeliveryReceiptAttributedToEnum);
  }

  onReceiptConfirmed(deliveryReceipt: PopulatedDeliveryReceiptWithRecipient) {
    const { type, attributedTo, recipient, originator } = deliveryReceipt;

    const allowedAttributedTo = [DeliveryReceiptAttributedToEnum.Ride, DeliveryReceiptAttributedToEnum.Hub];

    if (!allowedAttributedTo.includes(attributedTo as DeliveryReceiptAttributedToEnum)) {
      throw new Error(`${attributedTo} cannot receipt this shipment`);
    }

    if (attributedTo === DeliveryReceiptAttributedToEnum.Ride) {
      return new ShippedToHubState(deliveryReceipt);
    }

    const receiptingHub = type === "Receive" ? recipient.hub : originator.hub;

    if (!receiptingHub || !isOfTypeEntity(receiptingHub)) {
      throw new Error("Bad implementation");
    }

    const isReceivedByHotspot = receiptingHub.isHotspot;

    return isReceivedByHotspot
      ? new OriginHotspotReceivedState(deliveryReceipt)
      : new HubReceivedState(deliveryReceipt);
  }
}
