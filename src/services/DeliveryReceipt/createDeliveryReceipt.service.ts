import { badData, notFound } from "~errors/index.js";
import {
  agencyRepository,
  employeeRepository,
  hubRepository,
  rideRepository,
  shipmentRepository,
  deliveryReceiptRepository,
} from "~infra/index.js";
import { isRideValidForDeliveryReceipt } from "./deliveryReceiptRideGuard.js";
import { getShipmentInvalidStateErrorMessage, ShipmentFlow } from "../ShipmentFlow/index.js";
import { DeliveryReceiptInterface, DeliveryReceiptPartTypeEnum, ID } from "~types/index.js";
import { getUniqueCode } from "~utilities/index.js";

class CreateDeliveryReceiptService {
  constructor() {
    this.create = this.create.bind(this);
    this.generateReference = this.generateReference.bind(this);
    this.getOriginatorTypeEntity = this.getOriginatorTypeEntity.bind(this);
    this.getRecipientTypeEntity = this.getRecipientTypeEntity.bind(this);
  }

  async create(payload: DeliveryReceiptInterface) {
    const shipmentIds = payload.shipments.map(shipment => shipment as ID);
    const shipments = await shipmentRepository.findMany({ _id: { $in: shipmentIds } });
    if (shipments.length !== shipmentIds.length) throw new Error("Some shipments do not exist");

    const {
      originator: originatorId,
      recipient: recipientId,
      rideCode,
      recipientType,
      originatorAgency,
      originatorHub,
    } = payload;

    await isRideValidForDeliveryReceipt(
      recipientType,
      originatorAgency as ID | null,
      originatorHub as ID | null,
      rideCode
    );

    const [originator, recipient] = await Promise.all([
      employeeRepository.findById(originatorId as ID),
      recipientId && employeeRepository.findById(recipientId as ID),
    ]);

    if (!originator) throw notFound("الموظف غير موجود");
    if (recipientId && !recipient) throw notFound("الموظف غير موجود");

    const [reference, originatorEntity, recipientEntity] = await Promise.all([
      this.generateReference(),
      this.getOriginatorTypeEntity(payload),
      this.getRecipientTypeEntity(payload),
    ]);

    const populatedDeliveryReceipt = {
      ...payload,
      reference,
      recipient: recipient ?? undefined,
      originator,
      ...originatorEntity,
      ...recipientEntity,
    };

    shipments.forEach(shipment => {
      if (!new ShipmentFlow(shipment, populatedDeliveryReceipt).isValidReceipt()) {
        throw badData(getShipmentInvalidStateErrorMessage(shipment.code));
      }
    });

    return deliveryReceiptRepository.create(populatedDeliveryReceipt);
  }

  private async getOriginatorTypeEntity(payload: DeliveryReceiptInterface) {
    const { originatorType, originatorHub, originatorAgency, originatorRide } = payload;
    switch (originatorType) {
      case DeliveryReceiptPartTypeEnum.Hub:
        if (!originatorHub) return {};
        return { originatorHub: await hubRepository.findById(originatorHub as ID) };
      case DeliveryReceiptPartTypeEnum.Agency:
        if (!originatorAgency) return {};
        return { originatorAgency: await agencyRepository.findById(originatorAgency as ID) };
      case DeliveryReceiptPartTypeEnum.Ride:
        if (!originatorRide) return {};
        return { originatorRide: await rideRepository.findById(originatorRide as ID) };
      default:
        return;
    }
  }

  private async getRecipientTypeEntity(payload: DeliveryReceiptInterface) {
    const { recipientType, recipientHub, recipientAgency, recipientRide } = payload;

    switch (recipientType) {
      case DeliveryReceiptPartTypeEnum.Hub:
        if (!recipientHub) return {};
        return { recipientHub: await hubRepository.findById(recipientHub as ID) };
      case DeliveryReceiptPartTypeEnum.Agency:
        if (!recipientAgency) return {};
        return { recipientAgency: await agencyRepository.findById(recipientAgency as ID) };
      case DeliveryReceiptPartTypeEnum.Ride:
        if (!recipientRide) return {};
        return { recipientRide: await rideRepository.findById(recipientRide as ID) };
      default:
        return;
    }
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

export default new CreateDeliveryReceiptService();
