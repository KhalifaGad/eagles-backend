import { isOfTypeEntity } from "../mongoDB";
import { badData, badRequest, forbidden, notFound } from "../errors";
import { deliveryReceiptRepository, shipmentRepository, employeeRepository } from "../mongoDB/repositories";
import DefaultService from "./default.service";
import { AuthUser, DeliveryReceiptInterface, EmployeeInterface, ID } from "../types";
import { DeliveryReceiptFlow } from "./DeliveryReceiptFlow";

const getErrorMessage = (ref: string) => {
  const part1 = "حالة الشحنه";
  const part2 = "غير مناسبه للايصال";
  return `${part2} (${ref}) ${part1}`;
};

class DeliveryReceiptService extends DefaultService<DeliveryReceiptInterface> {
  constructor() {
    super(deliveryReceiptRepository);
    this.confirm = this.confirm.bind(this);
  }

  async create(payload: DeliveryReceiptInterface) {
    const shipmentIds = payload.shipments.map(shipment => shipment as ID);
    const shipments = await shipmentRepository.findMany({ _id: { $in: shipmentIds } });
    if (shipments.length !== shipmentIds.length) throw new Error("Some shipments do not exist");

    const { originator: originatorId, recipient: recipientId } = payload;

    const [originator, recipient] = await Promise.all([
      employeeRepository.findById(originatorId as ID),
      employeeRepository.findById(recipientId as ID),
    ]);

    const populatedDeliveryReceipt = {
      ...payload,
      originator,
      recipient,
    };

    shipments.forEach(shipment => {
      if (!new DeliveryReceiptFlow(shipment.status).isValidReceipt(populatedDeliveryReceipt))
        {throw badData(getErrorMessage(shipment.code));}
    });

    return super.create(payload);
  }

  async confirm(id: ID, authUser: AuthUser) {
    const deliveryReceipt = await deliveryReceiptRepository.findById(id);
    if (!deliveryReceipt) throw notFound("ايصال غير صحيح");

    if (deliveryReceipt.isRecipientConfirmed) throw badRequest("تم تاكيد الايصال من قبل");

    if (!(authUser.user as EmployeeInterface)?.isAdmin && authUser.user._id !== deliveryReceipt.recipient._id)
      {throw forbidden("يمكن تاكيد الايصال من قبل المستلم فقط");}

    const shipments = deliveryReceipt.shipments.map(shipment => {
      if (!isOfTypeEntity(shipment)) throw new Error("bad implementation");
      return shipment;
    });

    shipments.forEach(shipment => {
      if (!new DeliveryReceiptFlow(shipment.status).isValidReceipt(deliveryReceipt))
        {throw badData(getErrorMessage(shipment.code));}
    });

    for (const shipment of shipments) {
      const deliveryReceiptFlow = new DeliveryReceiptFlow(shipment.status);
      deliveryReceiptFlow.onReceiptConfirmed(deliveryReceipt);
      const { status, event } = deliveryReceiptFlow.getState();
      await shipmentRepository.updateWhereId(shipment._id as ID, {
        status,
        ...(event && { events: [...shipment.events, event] }),
      });
    }

    await deliveryReceiptRepository.updateWhereId(id, { isRecipientConfirmed: true });

    return deliveryReceiptRepository.findById(id);
  }
}

export default new DeliveryReceiptService();
