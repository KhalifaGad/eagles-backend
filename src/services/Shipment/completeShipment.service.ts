import { badData } from "@hapi/boom";
import { shipmentRepository } from "~infra/index.js";
import codeGenerator from "./codeGenerator.js";
import {
  AccountEnum,
  AgencyInterface,
  AuthUser,
  ClientInterface,
  CompanyInterface,
  CompleteShipmentInterface,
  EmployeeInterface,
  ID,
  ShipmentEventNamesEnum,
  ShipmentInterface,
  ShipmentStatuses,
} from "~types/index.js";

class CompleteShipmentService {
  constructor() {
    this.complete = this.complete.bind(this);
    this.getShipment = this.getShipment.bind(this);
    this.createReturnShipment = this.createReturnShipment.bind(this);
    this.getShipmentSearchables = this.getShipmentSearchables.bind(this);
  }

  async complete(id: ID, payload: CompleteShipmentInterface, authUser: AuthUser) {
    const { rejectedProducts } = payload ?? {};
    const shipment = await this.getShipment(id);
    const returnShipment = rejectedProducts
      ? await this.createReturnShipment(shipment, rejectedProducts, authUser)
      : null;
    const isReturningAllProducts = rejectedProducts?.length === shipment.products.length;
    return shipmentRepository.updateWhereId(id, {
      status: isReturningAllProducts ? ShipmentStatuses.RETURNED_TO_ORIGIN : ShipmentStatuses.DELIVERED,
      returnShipment: returnShipment?._id,
      ...(rejectedProducts?.length && {
        returns: shipment.products.filter(({ _id }) => _id && rejectedProducts.includes(_id.toString())),
      }),
      events: [
        ...shipment.events,
        {
          name: isReturningAllProducts ? ShipmentEventNamesEnum.RETURN_TO_ORIGIN : ShipmentEventNamesEnum.COMPLETED,
          date: new Date(),
          employee: authUser.accountType === AccountEnum.Employee ? (authUser.user as EmployeeInterface) : undefined,
        },
      ],
    });
  }

  private async getShipment(id: ID) {
    const shipment = await shipmentRepository.findById(id);
    if (!shipment) {
      throw badData("الشحنه غير موجود");
    }
    return shipment;
  }

  private async createReturnShipment(shipment: ShipmentInterface, rejectedProducts: string[], authUser: AuthUser) {
    const products = shipment.products.filter(({ _id }) => _id && rejectedProducts.includes(_id?.toString()));
    return shipmentRepository.create({
      shippingFees: 0,
      shipmentPrice: 0,
      collectCashFees: 0,
      products,
      code: await codeGenerator.generate(),
      referenceNumber: `R-${shipment.referenceNumber}`,
      consignor: shipment.consignee._id,
      consignorType: shipment.consigneeType,
      consignee: shipment.consignor._id,
      consigneeType: shipment.consignorType,
      originAgency: shipment.destinationAgency?._id,
      destinationAgency: shipment.originAgency._id,
      originHotspot: shipment.destinationHotspot?._id,
      destinationHotspot: shipment.originHotspot?._id,
      hub: shipment.hub?._id,
      status: ShipmentStatuses.PLACED,
      isReturning: true,
      isInCity: shipment.isInCity,
      searchables: this.getShipmentSearchables(shipment),
      events: [
        {
          name: ShipmentEventNamesEnum.PLACED,
          date: new Date(),
          employee: authUser.accountType === AccountEnum.Employee ? (authUser.user as EmployeeInterface) : undefined,
        },
      ],
    });
  }

  private getShipmentSearchables(shipment: ShipmentInterface) {
    const consignor = shipment.consignor as CompanyInterface | ClientInterface;
    const consignee = shipment.consignee as CompanyInterface | ClientInterface;
    const originAgency = shipment.originAgency as AgencyInterface;
    const destinationAgency = shipment.destinationAgency as AgencyInterface;

    return {
      consignorName: consignee.name,
      consigneeName: consignor.name,
      consignorMobile: consignee.mobile,
      consigneeMobile: consignor.mobile,
      originAgencyName: destinationAgency.name,
      destinationAgencyName: originAgency.name,
    };
  }
}

export default new CompleteShipmentService();
