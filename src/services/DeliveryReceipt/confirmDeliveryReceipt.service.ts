import { badData, badRequest, notFound } from "~errors/index.js";
import { deliveryReceiptRepository, rideRepository, shipmentRepository } from "~infra/index.js";
import {
  AuthUser,
  DeliveryReceiptPartTypeEnum,
  DeliveryReceiptTypeEnum,
  EmployeeInterface,
  ID,
  PopulatedDeliveryReceipt,
  ShipmentInterface,
} from "~types/index.js";
import { getShipmentInvalidStateErrorMessage, ShipmentFlow } from "src/services/ShipmentFlow/index.js";

class ConfirmDeliveryReceiptService {
  constructor() {
    this.confirm = this.confirm.bind(this);
    this.confirmationGuard = this.confirmationGuard.bind(this);
    this.getRecipient = this.getRecipient.bind(this);
    this.updateRide = this.updateRide.bind(this);
  }

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
      if (!new ShipmentFlow(shipment, deliveryReceipt).isValidReceipt()) {
        throw badData(getShipmentInvalidStateErrorMessage(shipment.code));
      }
    });

    const updateShipments = shipments.map(shipment => {
      const deliveryReceiptFlow = new ShipmentFlow(shipment, deliveryReceipt);
      deliveryReceiptFlow.onReceiptConfirmed();
      const { status, event } = deliveryReceiptFlow.getState();
      return {
        _id: shipment._id,
        status,
        ...(event && { events: [...shipment.events, event] }),
      };
    });

    await this.updateRide(deliveryReceipt);

    for (const { _id, ...updatedProps } of updateShipments) {
      await shipmentRepository.updateWhereId(_id as ID, updatedProps);
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

    const authenticatedEmployeeAgency = authenticatedEmployee.agency?._id?.toString() ?? authenticatedEmployee.agency;

    if (
      deliveryReceipt.recipientAgency &&
      authenticatedEmployeeAgency !== deliveryReceipt.recipientAgency?._id?.toString()
    ) {
      throw badRequest("يجب تاكيد الاستلام من قبل الوكالة المستلمه فقط");
    }

    if (deliveryReceipt.recipientHub && authenticatedEmployee.hub !== deliveryReceipt.recipientHub?._id?.toString()) {
      throw badRequest("يجب تاكيد الاستلام من قبل المخزن المستلم فقط");
    }

    return deliveryReceipt;
  }

  private getRecipient(deliveryReceipt: PopulatedDeliveryReceipt, authUser: AuthUser) {
    const authenticatedEmployee = authUser.user as EmployeeInterface;

    if (deliveryReceipt.recipient) return deliveryReceipt.recipient as EmployeeInterface;

    return authenticatedEmployee;
  }

  private async updateRide(deliveryReceipt: PopulatedDeliveryReceipt) {
    const { rideCode, recipientType, originatorAgency, originatorHub, type, originatorType } = deliveryReceipt;
    if (recipientType !== DeliveryReceiptPartTypeEnum.Ride) {
      return;
    }

    const ride = await rideRepository.findOne({ code: rideCode });
    if (!ride) {
      throw notFound("الرحلة غير موجودة");
    }

    const deliveryReceiptShipments = deliveryReceipt.shipments as ShipmentInterface[];
    const deliveryReceiptShipmentIds = deliveryReceiptShipments.map(shipment => shipment._id?.toString() as string);
    const rideShipments = ride.shipments as ShipmentInterface[];
    const shouldRemoveShipments = type === DeliveryReceiptTypeEnum.Receive; // as currently ride always a recipient.

    const updatedRideShipments = shouldRemoveShipments
      ? rideShipments.filter(
          rideShipment => !deliveryReceiptShipmentIds.includes(rideShipment._id?.toString() as string)
        )
      : [...rideShipments, ...deliveryReceiptShipments];

    const currentStep =
      originatorType === DeliveryReceiptPartTypeEnum.Agency
        ? ride.steps.findIndex(step => step.stepLocationEntity._id?.toString() === originatorAgency?._id?.toString())
        : ride.steps.findIndex(step => step.stepLocationEntity._id?.toString() === originatorHub?._id?.toString());

    if (currentStep === -1) {
      throw notFound("الموقع الحالي غير موجود بالرحله");
    }

    ride.steps[currentStep].visitDate = new Date();

    await rideRepository.updateWhereId(ride._id as ID, {
      shipments: updatedRideShipments,
      lastVisitedStep: currentStep,
      steps: ride.steps,
    });
  }
}

export default new ConfirmDeliveryReceiptService();
