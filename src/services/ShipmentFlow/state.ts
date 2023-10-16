import { ShipmentEventType, ShipmentStatuses } from "$types";

export interface DeliveryReceiptStateInterface {
  event?: ShipmentEventType;
  status: ShipmentStatuses;

  isValidReceipt(): boolean;

  onReceiptConfirmed(): DeliveryReceiptStateInterface;

  getState(): {
    event?: ShipmentEventType;
    status: ShipmentStatuses;
  };
}
