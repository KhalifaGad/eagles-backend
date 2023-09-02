import DefaultRepository from "./default.repository";
import { DeliveryReceiptModel } from "../models";
import { DeliveryReceiptInterface } from "../../types";

class DeliveryReceiptRepository extends DefaultRepository<DeliveryReceiptInterface> {
	constructor() {
		super(DeliveryReceiptModel, [{ path: "recipient" }, { path: "originator" }, { path: "shipments" }]);
	}
}

export default new DeliveryReceiptRepository();
