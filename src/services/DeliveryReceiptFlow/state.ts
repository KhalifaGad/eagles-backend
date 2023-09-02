import { DeliveryReceiptInterface, PopulatedEntitiesWrapper, ShipmentEventType, ShipmentStatuses } from "../../types";

export interface DeliveryReceiptStateInterface {
	event?: ShipmentEventType;
	status: ShipmentStatuses;

	isValidReceipt(deliveryReceipt: DeliveryReceiptInterface): boolean;
	onReceiptConfirmed(deliveryReceipt: PopulatedEntitiesWrapper<DeliveryReceiptInterface>): DeliveryReceiptStateInterface;
	getState(): { event?: ShipmentEventType; status: ShipmentStatuses };
}
