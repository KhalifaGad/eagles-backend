import { isOfTypeEntity } from "../../mongoDB";
import { DeliveryReceiptInterface, PopulatedEntitiesWrapper, ShipmentStatuses, ShippedType } from "../../types";
import { DeliveryReceiptStateInterface } from "./state";
import { HubReceivedState } from "./hubReceived.state";

export class ShippedToHubState implements DeliveryReceiptStateInterface {
  status = ShipmentStatuses.SHIPPED_TO_HUB;
  event?: ShippedType;

  constructor(private deliveryReceipt?: PopulatedEntitiesWrapper<DeliveryReceiptInterface>) {
    this.initEvent();
  }

  getState() {
    return { status: this.status, event: this.event };
  }

  isValidReceipt(deliveryReceipt: DeliveryReceiptInterface) {
    const { attributedTo } = deliveryReceipt;

    const employee = deliveryReceipt.type === "Receive" ? deliveryReceipt.originator : deliveryReceipt.recipient;

    if (!isOfTypeEntity(employee)) throw new Error("Bad implementation");

    const employeeHub = employee.hub;
    if (!employeeHub) return false;
    if (!isOfTypeEntity(employeeHub)) throw new Error("Bad implementation");

    return attributedTo === "Hub" && !employeeHub.isHotspot;
  }

  onReceiptConfirmed(deliveryReceipt: PopulatedEntitiesWrapper<DeliveryReceiptInterface>) {
    const { attributedTo } = deliveryReceipt;

    if (this.isValidReceipt(deliveryReceipt as DeliveryReceiptInterface))
      {throw new Error(`${attributedTo} cannot receipt this shipment`);}

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
