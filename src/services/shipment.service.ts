import { badData } from "@hapi/boom";
import { notFound } from "../errors";
import { getEntityRef, getUniqueCode } from "../utilities";
import { agencyRepository, clientRepository, companyRepository, shipmentRepository } from "../mongoDB/repositories";
import DefaultService from "./default.service";
import {
  AccountEnum,
  AddressInterface,
  AuthUser,
  CreateShipmentInterface,
  EmployeeInterface,
  ShipmentConsigneeEnum,
  ShipmentConsignorEnum,
  ShipmentEventNamesEnum,
  ShipmentInterface,
} from "../types";

class ShipmentService extends DefaultService<ShipmentInterface> {
  constructor() {
    super(shipmentRepository);
    this.createShipment = this.createShipment.bind(this);
    this.getConsignor = this.getConsignor.bind(this);
    this.getConsignee = this.getConsignee.bind(this);
    this.getNearestAgency = this.getNearestAgency.bind(this);
    this.shipmentCreationGuard = this.shipmentCreationGuard.bind(this);
    this.generateCode = this.generateCode.bind(this);
  }

  async createShipment(payload: CreateShipmentInterface, authUser: AuthUser) {
    this.shipmentCreationGuard(payload);
    const consignor = await this.getConsignor(payload.consignorType, payload.consignor);
    const originAgencyId = payload.originAgency;
    const originAgency = originAgencyId
      ? await agencyRepository.findById(originAgencyId)
      : await this.getNearestAgency(consignor.address);
    if (!originAgency) throw notFound("لا يمكن ايجاد وكاله استلام في نفس المدينه");

    const consignee = await this.getConsignee(payload.consigneeType, payload.consignee);
    const isInCity = getEntityRef(consignee.address.city) === getEntityRef(consignor.address.city);
    const destinationAgencyId = isInCity ? originAgency._id : payload.destinationAgency;
    const destinationAgency = destinationAgencyId
      ? await agencyRepository.findById(destinationAgencyId)
      : await this.getNearestAgency(consignee.address);

    if (!destinationAgency) throw notFound("لا يمكن ايجاد وكاله تسليم في نفس المدينه");

    const code = await this.generateCode();

    return this.repository.create({
      ...payload,
      code,
      consignor: consignor._id,
      consignee: consignee._id,
      originAgency: originAgency._id,
      destinationAgency: destinationAgency._id,
      searchables: {
        consignorName: consignor.name,
        consigneeName: consignee.name,
        consignorMobile: consignor.mobile,
        consigneeMobile: consignee.mobile,
        originAgencyName: originAgency.name,
        destinationAgencyName: destinationAgency.name,
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

  private async getConsignor(type: ShipmentConsignorEnum, consignorId: string) {
    const consignor =
      type === ShipmentConsignorEnum.Client
        ? await clientRepository.findById(consignorId)
        : await companyRepository.findById(consignorId);
    if (!consignor) {
      throw badData("المرسل غير موجود");
    }
    return consignor;
  }

  private async getConsignee(type: ShipmentConsigneeEnum, consigneeId: string) {
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

  private async generateCode() {
    let code = "";
    let isExist = true;
    do {
      code = getUniqueCode();
      const existingCount = await shipmentRepository.count({ code });
      isExist = existingCount > 1;
    } while (isExist);
    return code;
  }
}

export default new ShipmentService();
