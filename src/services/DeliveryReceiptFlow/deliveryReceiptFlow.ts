import { PopulatedDeliveryReceipt, ShipmentStatuses } from "$types";
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

  constructor(private status: ShipmentStatuses, private deliveryReceipt: PopulatedDeliveryReceipt) {
    this.state = this.initState(deliveryReceipt);
  }

  initState(deliveryReceipt: PopulatedDeliveryReceipt) {
    switch (this.status) {
      case ShipmentStatuses.PLACED:
        return new PlacedState(deliveryReceipt);
      case ShipmentStatuses.ORIGIN_HOTSPOT_RECEIVED:
        return new OriginHotspotReceivedState(deliveryReceipt);
      case ShipmentStatuses.HUB_RECEIVED:
        return new HubReceivedState(deliveryReceipt);
      case ShipmentStatuses.DESTINATION_HOTSPOT_RECEIVED:
        return new DestinationHotspotReceivedState(deliveryReceipt);
      case ShipmentStatuses.SHIPPED_TO_DESTINATION_HOTSPOT:
        return new ShippedToDestinationHotspot(deliveryReceipt);
      case ShipmentStatuses.SHIPPED_TO_DESTINATION_AGENCY:
        return new ShippedToDestinationAgency(deliveryReceipt);
      case ShipmentStatuses.SHIPPED_TO_HUB:
        return new ShippedToHubState(deliveryReceipt);
      default:
        throw new Error("Bad implementation");
    }
  }

  getState() {
    return this.state.getState();
  }

  isValidReceipt() {
    return this.state.isValidReceipt();
  }

  onReceiptConfirmed() {
    this.state = this.state.onReceiptConfirmed();
  }
}
