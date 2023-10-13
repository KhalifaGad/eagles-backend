import { isOfTypeEntity } from "$infra";
import { DeliveryReceiptTypeEnum, PopulatedDeliveryReceipt, ShipmentStatuses, ShippedType } from "$types";
import { DestinationHotspotReceivedState } from "./destinationHotspotReceived.state.js";
import { DeliveryReceiptStateInterface } from "./state.js";

export class ShippedToDestinationHotspot implements DeliveryReceiptStateInterface {
  status = ShipmentStatuses.SHIPPED_TO_DESTINATION_HOTSPOT;
  event?: ShippedType;

  constructor(private deliveryReceipt: PopulatedDeliveryReceipt) {
    this.initEvent();
  }

  getState() {
    return { status: this.status, event: this.event };
  }

  isValidReceipt() {
    const { type, recipientHub, originatorHub } = this.deliveryReceipt;

    const hub = type === DeliveryReceiptTypeEnum.Receive ? recipientHub : originatorHub;

    if (!hub) return false;
    if (!isOfTypeEntity(hub)) throw new Error("Bad implementation");

    return hub.isHotspot;
  }

  onReceiptConfirmed() {
    if (this.isValidReceipt()) {
      throw new Error("Cannot receipt this shipment by the current employee");
    }

    return new DestinationHotspotReceivedState(this.deliveryReceipt);
  }

  private initEvent() {
    if (!this.deliveryReceipt) return;
    const { type, recipient, originator } = this.deliveryReceipt;

    const employee = type === "Receive" ? recipient : originator;

    if (!employee?._id) throw new Error("Bad implementation");

    this.event = {
      name: "SHIPPED",
      date: new Date(),
      destinationType: "HUB",
      employee: employee._id,
    };
  }
}
