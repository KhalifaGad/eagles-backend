import { deliveryReceiptRepository, shipmentRepository } from "~infra/index.js";
import { isRideValidForDeliveryReceipt } from "./deliveryReceiptRideGuard.js";
import { DeliveryReceiptInterface, ID, ListArgumentsInterface } from "~types/index.js";
import DefaultService from "../default.service.js";

class DeliveryReceiptService extends DefaultService<DeliveryReceiptInterface> {
  constructor() {
    super(deliveryReceiptRepository);
  }

  async list(listArguments: ListArgumentsInterface<DeliveryReceiptInterface>) {
    if (listArguments.filter?.groupedFilter?.shipments) {
      const shipmentCodes = listArguments.filter?.groupedFilter?.shipments;
      const shipments = await shipmentRepository.findMany({ code: { $in: shipmentCodes } }, true);
      listArguments.filter.groupedFilter.shipments = shipments.map(shipment => shipment._id?.toString());
    }
    return this.repository.list(listArguments);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(payload: DeliveryReceiptInterface): Promise<DeliveryReceiptInterface> {
    throw new Error("Method should not be used, use createDeliveryReceiptService instead");
  }

  async update(id: ID, payload: DeliveryReceiptInterface): Promise<DeliveryReceiptInterface | null> {
    const { rideCode, recipientType, originatorAgency, originatorHub } = payload;

    await isRideValidForDeliveryReceipt(
      recipientType,
      originatorAgency as ID | null,
      originatorHub as ID | null,
      rideCode
    );

    return super.update(id, payload);
  }
}

export default new DeliveryReceiptService();
