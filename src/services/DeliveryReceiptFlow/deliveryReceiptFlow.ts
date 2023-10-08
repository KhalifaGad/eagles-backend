import { isOfTypeEntity } from "$infra";
import { PopulatedDeliveryReceipt, PopulatedDeliveryReceiptWithRecipient, ShipmentStatuses } from "$types";
import { DestinationHotspotReceivedState } from "./destinationHotspotReceived.state.js";
import { HubReceivedState } from "./hubReceived.state.js";
import { OriginHotspotReceivedState } from "./originHotspotReceived.state.js";
import { PlacedState } from "./placed.state.js";
import { ShippedToDestinationAgency } from "./shippedToDestinationAgency.state.js";
import { ShippedToDestinationHotspot } from "./shippedToDestinationHotspot.state.js";
import { ShippedToHubState } from "./shippedToHub.state.js";
import { DeliveryReceiptStateInterface } from "./state.js";

export class DeliveryReceiptFlow {
  private state: DeliveryReceiptStateInterface;

  constructor(private status: ShipmentStatuses) {
    this.state = this.initState();
  }

  initState() {
    switch (this.status) {
      case ShipmentStatuses.PLACED:
        return new PlacedState();
      case ShipmentStatuses.ORIGIN_HOTSPOT_RECEIVED:
        return new OriginHotspotReceivedState();
      case ShipmentStatuses.HUB_RECEIVED:
        return new HubReceivedState();
      case ShipmentStatuses.DESTINATION_HOTSPOT_RECEIVED:
        return new DestinationHotspotReceivedState();
      case ShipmentStatuses.SHIPPED_TO_DESTINATION_HOTSPOT:
        return new ShippedToDestinationHotspot();
      case ShipmentStatuses.SHIPPED_TO_DESTINATION_AGENCY:
        return new ShippedToDestinationAgency();
      case ShipmentStatuses.SHIPPED_TO_HUB:
        return new ShippedToHubState();
      default:
        throw new Error("Bad implementation");
    }
  }

  getState() {
    return this.state.getState();
  }

  isValidReceipt(deliveryReceipt: PopulatedDeliveryReceipt) {
    return this.state.isValidReceipt(deliveryReceipt);
  }

  onReceiptConfirmed(deliveryReceipt: PopulatedDeliveryReceiptWithRecipient) {
    const { recipient, originator } = deliveryReceipt;

    if (!isOfTypeEntity(recipient) || !isOfTypeEntity(originator)) throw new Error("Bad implementation");

    const unwrappedDeliveryReceipt = {
      ...deliveryReceipt,
      recipient,
      originator,
    };

    this.state = this.state.onReceiptConfirmed(unwrappedDeliveryReceipt);
  }
}
