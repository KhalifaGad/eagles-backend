import {
	DeliveryReceiptInterface,
	PopulatedEntitiesWrapper,
	ShipmentStatuses, ShippedType,
} from "../../types";
import { DeliveryReceiptStateInterface } from "./state";

export class ShippedToDestinationAgency implements DeliveryReceiptStateInterface {
	status = ShipmentStatuses.SHIPPED_TO_DESTINATION_AGENCY;
	event?: ShippedType;

	constructor(private deliveryReceipt?: PopulatedEntitiesWrapper<DeliveryReceiptInterface>) {
		this.initEvent();
	}

	getState() {
		return { status: this.status };
	}

	isValidReceipt(deliveryReceipt: DeliveryReceiptInterface) {
		return true;
	}

	onReceiptConfirmed(deliveryReceipt: PopulatedEntitiesWrapper<DeliveryReceiptInterface>) {
		return this;
	}

	private initEvent() {
		if (!this.deliveryReceipt) return;
		const { type, recipient, originator } = this.deliveryReceipt;

		const employee = type === "Receive" ? recipient : originator;

		if(!employee._id) throw new Error("Bad implementation");

		this.event = {
			name: "SHIPPED",
			date: new Date(),
			destinationType: "HUB",
			employee: employee._id,
		};
	}
}
