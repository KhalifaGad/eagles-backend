import { isOfTypeEntity } from "$infra";
import {
  DeliveryReceiptPartTypeEnum,
  DeliveryReceiptTypeEnum,
  PopulatedDeliveryReceipt,
  ShipmentStatuses,
  ShippedType,
} from "$types";
import { HubReceivedState } from "./hubReceived.state.js";
import { DeliveryReceiptStateInterface } from "./state.js";

export class ShippedToHubState implements DeliveryReceiptStateInterface {
  status = ShipmentStatuses.SHIPPED_TO_HUB;
  event?: ShippedType;

  constructor(private deliveryReceipt: PopulatedDeliveryReceipt) {
    this.initEvent();
  }

  getState() {
    return { status: this.status, event: this.event };
  }

  isValidReceipt() {
    const { recipientHub, type, recipientType, originatorType } = this.deliveryReceipt;

    if (!recipientHub) return false;
    if (!isOfTypeEntity(recipientHub)) throw new Error("Bad implementation");

    const confirmationPartType = type === DeliveryReceiptTypeEnum.Receive ? recipientType : originatorType;

    return confirmationPartType === DeliveryReceiptPartTypeEnum.Hub && !recipientHub.isHotspot;
  }

  onReceiptConfirmed() {
    if (this.isValidReceipt()) {
      throw new Error("A Hub cannot receipt this shipment");
    }

    return new HubReceivedState(this.deliveryReceipt);
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
