import { badData } from "@hapi/boom";
import { notFound } from "~errors/index.js";
import {
  agencyRepository,
  clientRepository,
  companyRepository,
  hubRepository,
  shipmentRepository,
} from "~infra/index.js";
import {
  AccountEnum,
  AddressInterface,
  AgencyInterface,
  AuthUser,
  CreateShipmentInterface,
  EmployeeInterface,
  ID,
  ShipmentConsigneeEnum,
  ShipmentConsignorEnum,
  ShipmentEventNamesEnum,
  ShipmentStatuses,
} from "~types/index.js";
import { getEntityRef } from "~utilities/index.js";
import codeGenerator from "./codeGenerator.js";

class CreateShipmentService {
  constructor() {
    this.create = this.create.bind(this);
    this.getConsignor = this.getConsignor.bind(this);
    this.getConsignee = this.getConsignee.bind(this);
    this.getNearestAgency = this.getNearestAgency.bind(this);
    this.shipmentCreationGuard = this.shipmentCreationGuard.bind(this);
  }

  async create(payload: CreateShipmentInterface, authUser: AuthUser) {
    this.shipmentCreationGuard(payload);
    const consignor = await this.getConsignor(payload.consignorType, payload.consignor);
    const originAgencyId = payload.originAgency;
    const originAgency = originAgencyId
      ? await agencyRepository.findById(originAgencyId)
      : await this.getNearestAgency(consignor.address);
    if (!originAgency) throw notFound("لا يمكن ايجاد وكاله استلام في نفس المدينه");

    const consignee = await this.getConsignee(payload.consigneeType, payload.consignee);
    const isInCity = getEntityRef(consignee.address.city) === getEntityRef(consignor.address.city);
    const destinationAgency = isInCity ? undefined : await this.getNearestAgency(consignee.address);

    const code = await codeGenerator.generate();

    const { originHub, originHotspot } = await this.getOriginHubs(originAgency, isInCity);

    const hub = originHotspot?.parentHub ?? originHub?._id;
    const destinationHotspot = await this.getDestinationHotspot(destinationAgency, hub as ID | undefined);

    return shipmentRepository.create({
      ...payload,
      code,
      consignor: consignor._id,
      consignee: consignee._id,
      originAgency: originAgency._id,
      destinationAgency: destinationAgency?._id,
      originHotspot: originHotspot?._id,
      destinationHotspot,
      hub,
      status: ShipmentStatuses.PLACED,
      searchables: {
        consignorName: consignor.name,
        consigneeName: consignee.name,
        consignorMobile: consignor.mobile,
        consigneeMobile: consignee.mobile,
        originAgencyName: originAgency.name,
        destinationAgencyName: destinationAgency?.name,
      },
      events: [
        {
          name: ShipmentEventNamesEnum.PLACED,
          date: new Date(),
          employee: authUser.accountType === AccountEnum.Employee ? (authUser.user as EmployeeInterface) : undefined,
        },
      ],
    });
  }

  private async getConsignor(type: ShipmentConsignorEnum, consignorId: ID) {
    const consignor =
      type === ShipmentConsignorEnum.Client
        ? await clientRepository.findById(consignorId)
        : await companyRepository.findById(consignorId);
    if (!consignor) {
      throw badData("المرسل غير موجود");
    }
    return consignor;
  }

  private async getConsignee(type: ShipmentConsigneeEnum, consigneeId: ID) {
    const consignee =
      type === ShipmentConsigneeEnum.Client
        ? await clientRepository.findById(consigneeId)
        : await companyRepository.findById(consigneeId);
    if (!consignee) {
      throw badData("المرسل اليه غير موجود");
    }
    return consignee;
  }

  private async getNearestAgency(address: AddressInterface) {
    return agencyRepository.getNearestAgency(address);
  }

  private shipmentCreationGuard(payload: CreateShipmentInterface) {
    if (payload.referenceNumber && !payload.originAgency) {
      throw badData("يجب ادخال الوكالة المرسلة");
    }

    if (payload.originAgency && !payload.referenceNumber) {
      throw badData("يجب ادخال رقم الشحنة");
    }
  }

  private async getOriginHubs(originAgency: AgencyInterface, isInCity: boolean) {
    if (isInCity) {
      return {
        originHub: undefined,
        originHotspot: undefined,
      };
    }
    const originHub = await hubRepository.findById(originAgency.relatedHub as ID);
    if (!originHub) throw notFound("لا يمكن ايجاد المستودع");

    const originHotspot = originHub.isHotspot ? originHub : undefined;

    return {
      originHub,
      originHotspot,
    };
  }

  private async getDestinationHotspot(destinationAgency?: AgencyInterface, hub?: ID) {
    if (!destinationAgency) {
      // This means it's in the same city
      return undefined;
    }

    if (destinationAgency.relatedHub === hub) {
      return undefined;
    }

    const destinationHotspot = await hubRepository.findById(destinationAgency.relatedHub as ID);

    return destinationHotspot?.isHotspot ? destinationHotspot : undefined;
  }
}

export default new CreateShipmentService();
