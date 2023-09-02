import { isOfTypeEntity } from "../../mongoDB";
import { DestinationHotspotReceivedState } from "./destinationHotspotReceived.state";
import { HubReceivedState } from "./hubReceived.state";
import { OriginHotspotReceivedState } from "./originHotspotReceived.state";
import { ShippedToDestinationHotspot } from "./shippedToDestinationHotspot.state";
import { PlacedState } from "./placed.state";
import { ShippedToDestinationAgency } from "./shippedToDestinationAgency.state";
import { ShippedToHubState } from "./shippedToHub.state";
import { DeliveryReceiptStateInterface } from "./state";
import { DeliveryReceiptInterface, PopulatedEntitiesWrapper, ShipmentStatuses } from "../../types";

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

	isValidReceipt(deliveryReceipt: DeliveryReceiptInterface) {
		return this.state.isValidReceipt(deliveryReceipt);
	}

  onReceiptConfirmed(deliveryReceipt: DeliveryReceiptInterface) {
		if(!isOfTypeEntity(deliveryReceipt)) throw new Error("Bad implementation");
		const { recipient, originator } = deliveryReceipt;

		if(!isOfTypeEntity(recipient) || !isOfTypeEntity(originator)) throw new Error("Bad implementation");

		const unwrappedDeliveryReceipt: PopulatedEntitiesWrapper<DeliveryReceiptInterface> = {
			...deliveryReceipt,
			recipient,
			originator,
		}

    this.state = this.state.onReceiptConfirmed(unwrappedDeliveryReceipt);
  }
}
