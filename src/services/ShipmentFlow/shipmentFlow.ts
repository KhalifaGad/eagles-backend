import { PopulatedDeliveryReceipt, ShipmentStatuses } from "$types";
import { DestinationHotspotReceivedState } from "./destinationHotspotReceived.state.js";
import { DestinationAgencyReceivedState } from "./distnationAgencyReceived.state.js";
import { HubReceivedState } from "./hubReceived.state.js";
import { OriginHotspotReceivedState } from "./originHotspotReceived.state.js";
import { PlacedState } from "./placed.state.js";
import { ShippedToDestinationAgency } from "./shippedToDestinationAgency.state.js";
import { ShippedToDestinationHotspot } from "./shippedToDestinationHotspot.state.js";
import { ShippedToHubState } from "./shippedToHub.state.js";
import { DeliveryReceiptStateInterface } from "./state.js";

export class ShipmentFlow {
  private state: DeliveryReceiptStateInterface;

  constructor(private status: ShipmentStatuses, private deliveryReceipt: PopulatedDeliveryReceipt) {
    this.state = this.initState();
  }

  initState() {
    switch (this.status) {
      case ShipmentStatuses.PLACED:
        return new PlacedState(this.deliveryReceipt);
      case ShipmentStatuses.ORIGIN_HOTSPOT_RECEIVED:
        return new OriginHotspotReceivedState(this.deliveryReceipt);
      case ShipmentStatuses.HUB_RECEIVED:
        return new HubReceivedState(this.deliveryReceipt);
      case ShipmentStatuses.DESTINATION_HOTSPOT_RECEIVED:
        return new DestinationHotspotReceivedState(this.deliveryReceipt);
      case ShipmentStatuses.SHIPPED_TO_DESTINATION_HOTSPOT:
        return new ShippedToDestinationHotspot(this.deliveryReceipt);
      case ShipmentStatuses.SHIPPED_TO_DESTINATION_AGENCY:
        return new ShippedToDestinationAgency(this.deliveryReceipt);
      case ShipmentStatuses.DESTINATION_AGENCY_RECEIVED:
        return new DestinationAgencyReceivedState(this.deliveryReceipt);
      case ShipmentStatuses.SHIPPED_TO_HUB:
        return new ShippedToHubState(this.deliveryReceipt);
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
    this.state.onReceiptConfirmed();
  }
}
