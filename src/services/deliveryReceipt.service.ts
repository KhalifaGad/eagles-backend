import { badData, notFound } from "$errors";
import { deliveryReceiptRepository, employeeRepository, shipmentRepository } from "$infra";
import { DeliveryReceiptInterface, ID } from "$types";
import { getUniqueCode } from "$utils";
import DefaultService from "./default.service.js";
import { DeliveryReceiptFlow, getShipmentInvalidStateErrorMessage } from "./DeliveryReceiptFlow/index.js";

class DeliveryReceiptService extends DefaultService<DeliveryReceiptInterface> {
  constructor() {
    super(deliveryReceiptRepository);
  }

  async create(payload: DeliveryReceiptInterface) {
    const shipmentIds = payload.shipments.map(shipment => shipment as ID);
    const shipments = await shipmentRepository.findMany({ _id: { $in: shipmentIds } });
    if (shipments.length !== shipmentIds.length) throw new Error("Some shipments do not exist");

    const { originator: originatorId, recipient: recipientId } = payload;

    const [originator, recipient] = await Promise.all([
      employeeRepository.findById(originatorId as ID),
      recipientId && employeeRepository.findById(recipientId as ID),
    ]);

    if (!originator) throw notFound("الموظف غير موجود");

    const reference = await this.generateReference();

    const populatedDeliveryReceipt = {
      ...payload,
      reference,
      originator,
      recipient: recipient ?? undefined,
    };

    shipments.forEach(shipment => {
      if (!new DeliveryReceiptFlow(shipment.status).isValidReceipt(populatedDeliveryReceipt)) {
        throw badData(getShipmentInvalidStateErrorMessage(shipment.code));
      }
    });

    return super.create(populatedDeliveryReceipt);
  }

  private async generateReference() {
    let code;
    let existingCount;

    do {
      code = getUniqueCode();
      existingCount = await shipmentRepository.count({ code });
    } while (existingCount > 0);

    return code;
  }
}

export default new DeliveryReceiptService();
