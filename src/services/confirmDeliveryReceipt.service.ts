import { badData, badRequest, notFound } from "$errors";
import { deliveryReceiptRepository, shipmentRepository } from "$infra";
import { AuthUser, EmployeeInterface, ID, PopulatedDeliveryReceipt, ShipmentInterface } from "$types";
import { getShipmentInvalidStateErrorMessage, ShipmentFlow } from "./ShipmentFlow/index.js";

class ConfirmDeliveryReceiptService {
  async confirm(id: ID, authUser: AuthUser) {
    const unguardedDeliveryReceipt = (await deliveryReceiptRepository.findById(
      id
    )) as Awaited<PopulatedDeliveryReceipt | null>;

    const guardedDeliveryReceipt = this.confirmationGuard(unguardedDeliveryReceipt, authUser);

    const deliveryReceipt = {
      ...guardedDeliveryReceipt,
      recipient: this.getRecipient(guardedDeliveryReceipt, authUser),
    };

    const shipments = deliveryReceipt.shipments as ShipmentInterface[];

    shipments.forEach(shipment => {
      if (!new ShipmentFlow(shipment.status, deliveryReceipt).isValidReceipt()) {
        throw badData(getShipmentInvalidStateErrorMessage(shipment.code));
      }
    });

    for (const shipment of shipments) {
      const deliveryReceiptFlow = new ShipmentFlow(shipment.status, deliveryReceipt);
      deliveryReceiptFlow.onReceiptConfirmed();
      const { status, event } = deliveryReceiptFlow.getState();
      await shipmentRepository.updateWhereId(shipment._id as ID, {
        status,
        ...(event && { events: [...shipment.events, event] }),
      });
    }

    await deliveryReceiptRepository.updateWhereId(id, {
      isRecipientConfirmed: true,
      recipient: deliveryReceipt.recipient,
    });

    return deliveryReceiptRepository.findById(id);
  }

  private confirmationGuard(deliveryReceipt: PopulatedDeliveryReceipt | null, authUser: AuthUser) {
    const authenticatedEmployee = authUser.user as EmployeeInterface;
    if (!deliveryReceipt) throw notFound("ايصال غير صحيح");

    if (deliveryReceipt.isRecipientConfirmed) throw badRequest("تم تاكيد الايصال من قبل");

    if (authenticatedEmployee.isAdmin) return deliveryReceipt;

    if (deliveryReceipt.recipientAgency && authenticatedEmployee.agency?._id !== deliveryReceipt.recipientAgency) {
      throw badRequest("يجب تاكيد الاستلام من قبل الوكالة المستلمه فقط");
    }

    if (deliveryReceipt.recipientHub && authenticatedEmployee.hub?._id !== deliveryReceipt.recipientHub) {
      throw badRequest("يجب تاكيد الاستلام من قبل المخزن المستلم فقط");
    }

    return deliveryReceipt;
  }

  private getRecipient(deliveryReceipt: PopulatedDeliveryReceipt, authUser: AuthUser) {
    const authenticatedEmployee = authUser.user as EmployeeInterface;

    if (deliveryReceipt.recipient) return deliveryReceipt.recipient as EmployeeInterface;

    return authenticatedEmployee;
  }
}

export default new ConfirmDeliveryReceiptService();
