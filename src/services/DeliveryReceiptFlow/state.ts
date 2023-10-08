import {
  PopulatedDeliveryReceipt,
  PopulatedDeliveryReceiptWithRecipient,
  ShipmentEventType,
  ShipmentStatuses,
} from "$types";

export interface DeliveryReceiptStateInterface {
  event?: ShipmentEventType;
  status: ShipmentStatuses;

  isValidReceipt(deliveryReceipt: PopulatedDeliveryReceipt): boolean;

  onReceiptConfirmed(deliveryReceipt: PopulatedDeliveryReceiptWithRecipient): DeliveryReceiptStateInterface;

  getState(): { event?: ShipmentEventType; status: ShipmentStatuses };
}
