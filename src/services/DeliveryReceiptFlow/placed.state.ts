import { ShippedToHubState } from "./shippedToHub.state";
import { isOfTypeEntity } from "../../mongoDB";
import {
  DeliveryReceiptAttributedToEnum,
  DeliveryReceiptInterface,
  PopulatedEntitiesWrapper,
  ShipmentStatuses,
} from "../../types";
import { DeliveryReceiptStateInterface } from "./state";
import { HubReceivedState } from "./hubReceived.state";
import { OriginHotspotReceivedState } from "./originHotspotReceived.state";

export class PlacedState implements DeliveryReceiptStateInterface {
  status = ShipmentStatuses.PLACED;

  getState() {
    return { status: this.status };
  }

  isValidReceipt(deliveryReceipt: DeliveryReceiptInterface) {
    const { attributedTo } = deliveryReceipt;
    const allowedAttributedTo = [DeliveryReceiptAttributedToEnum.Ride, DeliveryReceiptAttributedToEnum.Hub];
    return allowedAttributedTo.includes(attributedTo as DeliveryReceiptAttributedToEnum);
  }

  onReceiptConfirmed(deliveryReceipt: PopulatedEntitiesWrapper<DeliveryReceiptInterface>) {
    const { type, attributedTo, recipient, originator } = deliveryReceipt;

    const allowedAttributedTo = [DeliveryReceiptAttributedToEnum.Ride, DeliveryReceiptAttributedToEnum.Hub];

    if (!allowedAttributedTo.includes(attributedTo as DeliveryReceiptAttributedToEnum))
      {throw new Error(`${attributedTo} cannot receipt this shipment`);}

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
