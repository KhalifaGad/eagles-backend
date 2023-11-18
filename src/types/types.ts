import { FilterQuery, PopulatedDoc, Require_id, Types as MongooseTypes } from "mongoose";
import * as Enums from "./enums.js";
import {
  AccountEnum,
  DeliveryReceiptPartTypeEnum,
  DeliveryReceiptTypeEnum,
  ShipmentConsigneeEnum,
  ShipmentConsignorEnum,
  ShipmentStatuses,
  StepLocationTypeEnum,
} from "./enums.js";

export interface ListOptionsInterface {
  page?: number;
  pageLimit?: number;
  sortBy?: string;
  sortDirection?: string;
  showAll?: boolean;
}

export interface ListArgumentsInterface<T> {
  filter?: FilterQuery<T>;
  options?: ListOptionsInterface;
  ignoreLean?: boolean;
}

export interface ListInterface<T> {
  data: Require_id<T>[];
  totalCount: number;
}

export type ID = MongooseTypes.ObjectId;
export type Entity<T> = NonNullable<PopulatedDoc<T>>;

export type PopulatedEntitiesWrapper<T> = {
  [K in keyof T]: T[K] extends Entity<infer E> ? E : T[K] extends string ? string : T[K];
};

export type WithRelation<T, K extends keyof T, NT = NonNullable<T[K]>> = Exclude<T, K> & {
  [P in K]-?: NonNullable<NT>;
};

export interface CityInterface {
  _id?: ID;
  arabicName: string;
  englishName: string;
}

export interface AddressInterface {
  area: string;
  street: string;
  city: Entity<CityInterface>;
  block?: string;
  floorNumber?: number;
  apartmentNumber?: string;
  landmark?: string;
  lat?: number;
  lng?: number;
  name?: string;
}

export interface HubInterface {
  _id?: ID;
  name: string;
  address: AddressInterface;
  isHotspot: boolean;
  parentHub?: Entity<HubInterface>;
}

export interface AgencyInterface {
  _id?: ID;
  name: string;
  address: AddressInterface;
  telephone: string;
  mobile: string;
  shareBusPercentage: number;
  inCityPackagePercentage: number;
  sentPackagePercentage: number;
  receivedPackagePercentage: number;
  relatedHub: Entity<HubInterface>;
}

export interface EmployeeInterface {
  _id?: ID;
  name: string;
  mobile: string;
  email?: string;
  birthdate?: Date;
  position: string;
  nationalId: string;
  qualification?: string;
  socialStatus?: string;
  address?: AddressInterface;
  salary: number;
  isAdmin: boolean;
  canJoinRides: boolean;
  isCustomerService: boolean;
  isAgencyAdmin: boolean;
  agency?: Entity<AgencyInterface>;
  hub?: Entity<HubInterface>;
}

type ShipmentProductType = {
  name: string;
  description?: string;
  price: number;
};

type PlacedEventNameType = "PLACED";
type ConfirmedEventNameType = "CONFIRMED";
type PickedEventNameType = "PICKED";
type AgencyReceivedEventNameType = "AGENCY_RECEIVED";
type HubReceivedEventNameType = "HUB_RECEIVED";
type HotspotReceivedEventNameType = "HOTSPOT_RECEIVED";
type ShippedEventNameType = "SHIPPED";
type FailedAttemptEventNameType = "FAILED_ATTEMPT";
type ReturnEventNameType = "RETURN";
type shipmentDestinationType = "AGENCY" | "HUB" | "CONSIGNEE";

type EventType = { name: string; date: Date };

type PlacedType = EventType & { name: PlacedEventNameType; employee?: EmployeeInterface };

export type ConfirmedType = EventType & {
  name: ConfirmedEventNameType;
};

export type HubReceivedType = EventType & {
  name: HubReceivedEventNameType | HotspotReceivedEventNameType;
  hub: Entity<HubInterface>;
};

export type ShippedType = EventType & {
  name: ShippedEventNameType;
  destinationType: shipmentDestinationType;
  employee: Entity<EmployeeInterface>;
};

export type FailedAttemptType = EventType & {
  name: FailedAttemptEventNameType;
};

export type ReturnType = EventType & {
  name: ReturnEventNameType;
  products: ShipmentProductType[];
};

export interface ClientInterface {
  _id?: ID;
  name: string;
  mobile: string;
  secondMobile: string;
  address: AddressInterface;
  defaultNearestAgency: Entity<AgencyInterface>;
  birthdate?: Date;
  email?: string;
}

export interface CompanyPaymentConfigInterface {
  defaultMethod: Enums.RepaymentEnum;
  walletNumber?: string;
  accountNumber?: string;
  bank?: string;
  branch?: string;
  branchAddress?: string;
  swftCode?: string;
  iban?: string;
}

export interface MerchantInterface {
  _id?: ID;
  name: string;
  position: Enums.CompanyEmployeesPositionEnum;
  mobile: string;
  email?: string;
  isAdmin: boolean;
}

export interface CompanyInterface {
  _id?: ID;
  name: string;
  mobile: string;
  companyType: Enums.CompaniesEnum;
  commercialNo?: string;
  taxNo?: string;
  businessType: string;
  address: AddressInterface;
  urls: { value: string; description: string }[];
  paymentConfig: CompanyPaymentConfigInterface;
  employees: MerchantInterface[];
}

export interface CompanyProductInterface {
  _id?: ID;
  name: string;
  description?: string;
  price: number;
  reference: string;
  company: Entity<CompanyInterface>;
}

export interface CredentialInterface {
  _id?: ID;
  mobile: string;
  password?: string;
  accountType: Enums.AccountEnum;
  account: Entity<EmployeeInterface | ClientInterface | CompanyInterface>;
}

export interface EmployeeRatingInterface {
  _id?: ID;
  employee: Entity<EmployeeInterface>;
  agency: Entity<AgencyInterface>;
  individualTasks: number;
  ordersExecution: number;
  teamPlaying: number;
  communicationSkills: number;
  timePunctuality: number;
  planPunctuality: number;
  appearance: number;
  hygiene: number;
  reward?: string;
  deduction?: string;
  notes?: string[];
  complaint?: string;
}

export interface VehicleInterface {
  _id?: ID;
  code: string;
  color: string;
  model: string;
  type: string;
  condition: string;
  tonnage: string;
  chassisNo: string;
  licenseId: string;
  licenseStartDate: Date;
  licenseRenewalDate: Date;
  insuranceStartDate: Date;
  insuranceRenewalDate: Date;
}

export interface SalaryInterface {
  _id?: ID;
  employee: Entity<EmployeeInterface>;
  agency: Entity<AgencyInterface>;
  baseSalary: number;
  deduction?: number;
  deductionReason?: string;
  reward?: number;
  rewardReason?: string;
  finalSalary: number;
  billed: boolean;
}

export type AgencyReceivedType = EventType & {
  name: AgencyReceivedEventNameType;
  agency: Entity<AgencyInterface>;
  employee: Entity<EmployeeInterface>;
};

type PickedType = EventType & {
  name: PickedEventNameType;
  employee: Entity<EmployeeInterface>;
};

export type ShipmentEventType =
  | PlacedType
  | ConfirmedType
  | PickedType
  | AgencyReceivedType
  | HubReceivedType
  | ShippedType
  | FailedAttemptType
  | ReturnType;

export interface ShipmentInterface {
  _id?: ID;
  code: string;
  referenceNumber?: string;
  consignorType: Enums.ShipmentConsignorEnum;
  consignor: Entity<CompanyInterface | ClientInterface>;
  consigneeType: Enums.ShipmentConsigneeEnum;
  consignee: Entity<CompanyInterface | ClientInterface>;
  // custodian: Entity<EmployeeInterface | CompanyInterface | ClientInterface>;
  // custodianType: Enums.AccountEnum;
  isInCity: boolean;
  originAgency: Entity<AgencyInterface>;
  originHotspot: Entity<HubInterface>;
  destinationAgency: Entity<AgencyInterface>;
  destinationHotspot: Entity<HubInterface>;
  hub: Entity<HubInterface>;
  events: ShipmentEventType[];
  shippingFees: number;
  status: ShipmentStatuses;
  collectCashFees?: number;
  shipmentPrice?: number;
  notes?: string[];
  products: ShipmentProductType[];
  returns: ShipmentProductType[];
  failedAttemptsCount: number;
  isReturning: boolean;
  searchables: {
    consignorName: string;
    consigneeName: string;
    consignorMobile: string;
    consigneeMobile: string;
    originAgencyName: string;
    destinationAgencyName: string;
  };
}

export interface CreateShipmentInterface {
  referenceNumber?: string;
  consigneeType: ShipmentConsigneeEnum;
  consignee: ID;
  consignorType: ShipmentConsignorEnum;
  consignor: ID;
  shippingFees: number;
  collectCashFees: number;
  shipmentPrice: number;
  originAgency?: ID;
  destinationAgency: ID;
  isInCity: boolean;
  notes: string[];
  products: ShipmentProductType[];
}

export interface AuthUser {
  credentialId: string;
  accountType: AccountEnum;
  user: EmployeeInterface | MerchantInterface | ClientInterface;
}

export interface CompanyAuthUser extends AuthUser {
  user: MerchantInterface;
  company: Omit<CompanyInterface, "employees">;
}

export interface EmployeeAuthUser extends AuthUser {
  user: EmployeeInterface;
}

export interface CreateRideStepInterface {
  sequence: number;
  stepLocationType: StepLocationTypeEnum;
  stepLocationEntity: Entity<AgencyInterface | HubInterface>;
}

export interface CreateRideTemplateInterface {
  name: string;
  steps: CreateRideStepInterface[];
}

export interface RideStepInterface {
  sequence: number;
  stepLocationType: StepLocationTypeEnum;
  stepLocationEntity: Entity<AgencyInterface | HubInterface>;
}

export interface RideTemplateInterface {
  _id?: string;
  name: string;
  steps: RideStepInterface[];
}

export interface RideInterface {
  // TODO: ADD Current (state or step or both)
  _id?: ID;
  code: string;
  employees: Entity<EmployeeInterface>[];
  shipments: Entity<ShipmentInterface>[];
  steps: RideStepInterface[]; // TODO: FIX THIS
  startDate?: Date;
  endDate?: Date;
}

export interface CreateRidePayload {
  rideTemplateId: ID;
  employees: Entity<EmployeeInterface>[];
  shipments: Entity<ShipmentInterface>[];
  steps: RideStepInterface[];
  startDate?: Date;
  endDate?: Date;
}

export interface DeliveryReceiptInterface {
  reference: string;
  type: DeliveryReceiptTypeEnum;
  recipient?: Entity<EmployeeInterface>;
  recipientHub?: Entity<HubInterface>;
  recipientAgency?: Entity<AgencyInterface>;
  recipientType: DeliveryReceiptPartTypeEnum;
  recipientRide?: Entity<RideInterface>;
  originator: Entity<EmployeeInterface>;
  originatorHub?: Entity<HubInterface>;
  originatorAgency?: Entity<AgencyInterface>;
  originatorRide?: Entity<RideInterface>;
  originatorType: DeliveryReceiptPartTypeEnum;
  isRecipientConfirmed: boolean;
  shipments: Entity<ShipmentInterface>[];
}

export type PopulatedDeliveryReceipt = WithRelation<
  WithRelation<DeliveryReceiptInterface, "originator", EmployeeInterface>,
  "shipments",
  Entity<ShipmentInterface>[]
>;
export type PopulatedDeliveryReceiptWithRecipient = WithRelation<
  WithRelation<WithRelation<DeliveryReceiptInterface, "recipient", EmployeeInterface>, "originator", EmployeeInterface>,
  "shipments",
  Entity<ShipmentInterface>[]
>;
