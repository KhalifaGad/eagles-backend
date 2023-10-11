import { isOfTypeEntity } from "$infra";
import { PopulatedDeliveryReceipt, PopulatedDeliveryReceiptWithRecipient, ShipmentStatuses, ShippedType } from "$types";
import { HubReceivedState } from "./hubReceived.state.js";
import { DeliveryReceiptStateInterface } from "./state.js";

export class ShippedToHubState implements DeliveryReceiptStateInterface {
  status = ShipmentStatuses.SHIPPED_TO_HUB;
  event?: ShippedType;

  constructor(private deliveryReceipt?: PopulatedDeliveryReceiptWithRecipient) {
    this.initEvent();
  }

  getState() {
    return { status: this.status, event: this.event };
  }

  isValidReceipt(deliveryReceipt: PopulatedDeliveryReceipt) {
    const { attributedTo, recipientHub } = deliveryReceipt;

    if (!recipientHub) return false;
    if (!isOfTypeEntity(recipientHub)) throw new Error("Bad implementation");

    return attributedTo === "Hub" && !recipientHub.isHotspot;
  }

  onReceiptConfirmed(deliveryReceipt: PopulatedDeliveryReceiptWithRecipient) {
    const { attributedTo } = deliveryReceipt;

    if (this.isValidReceipt(deliveryReceipt)) {
      throw new Error(`${attributedTo} cannot receipt this shipment`);
    }

    return new HubReceivedState(deliveryReceipt);
  }

  private initEvent() {
    if (!this.deliveryReceipt) return;
    const { type, recipient, originator } = this.deliveryReceipt;

    const employee = type === "Receive" ? recipient : originator;

    if (!employee._id) throw new Error("Bad implementation");

    this.event = {
      name: "SHIPPED",
      date: new Date(),
      destinationType: "HUB",
      employee: employee._id,
    };
  }
}
