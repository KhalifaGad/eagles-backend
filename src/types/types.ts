import { FilterQuery, PopulatedDoc, Types as MongooseTypes } from "mongoose";
import { ShipmentConsigneeEnum, ShipmentConsignorEnum } from "./enums";
import * as Enums from "./enums";

export interface ListOptionsInterface {
  page: number;
  pageLimit: number;
  sortBy: string;
  sortDirection: string;
  showAll?: boolean;
}

export interface ListArgumentsInterface<T> {
  filter?: FilterQuery<T>;
  options?: ListOptionsInterface;
}

export interface ListInterface<T> {
  data: T[];
  totalCount: number;
}

export type MongooseID = MongooseTypes.ObjectId;
type Entity<T> = NonNullable<PopulatedDoc<T>> | MongooseID;

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
type ShippedEventNameType = "SHIPPED";
type FailedAttemptEventNameType = "FAILED_ATTEMPT";
type ReturnEventNameType = "RETURN";
type shipmentDestinationType = "AGENCY" | "HUB" | "CONSIGNEE";

type EventType = { name: string; date: Date };

type PlacedType = EventType & { name: PlacedEventNameType };

type ConfirmedType = EventType & {
  name: ConfirmedEventNameType;
};

export interface CityInterface {
  _id?: MongooseID;
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

export interface AgencyInterface {
  _id?: MongooseID;
  name: string;
  address: AddressInterface;
  telephone: string;
  mobile: string;
  shareBusPercentage: number;
  inCityPackagePercentage: number;
  sentPackagePercentage: number;
  receivedPackagePercentage: number;
}

export interface HubInterface {
  _id?: MongooseID;
  name: string;
  address: AddressInterface;
}

type HubReceivedType = EventType & {
  name: HubReceivedEventNameType;
  hub: Entity<HubInterface>;
};

type ShippedType = EventType & {
  name: ShippedEventNameType;
  destinationType: shipmentDestinationType;
};

type FailedAttemptType = EventType & {
  name: FailedAttemptEventNameType;
};

type ReturnType = EventType & {
  name: ReturnEventNameType;
  products: ShipmentProductType[];
};

export interface ClientInterface {
  _id?: MongooseID;
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
  _id?: MongooseID;
  name: string;
  position: Enums.CompanyEmployeesPositionEnum;
  mobile: string;
  email?: string;
  isAdmin: boolean;
}

export interface CompanyInterface {
  _id?: MongooseID;
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
  _id?: MongooseID;
  name: string;
  description?: string;
  price: number;
  reference: string;
  company: Entity<CompanyInterface>;
}

export interface EmployeeInterface {
  _id?: MongooseID;
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
  isCustomerService: boolean;
  isAgencyAdmin: boolean;
  agency?: Entity<AgencyInterface>;
  hub?: Entity<HubInterface>;
}

export interface CredentialInterface {
  _id?: MongooseID;
  mobile: string;
  password?: string;
  accountType: Enums.AccountEnum;
  account: Entity<EmployeeInterface | ClientInterface | CompanyInterface>;
}

export interface EmployeeRatingInterface {
  _id?: MongooseID;
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
  _id?: MongooseID;
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
  _id?: MongooseID;
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

type AgencyReceivedType = EventType & {
  name: AgencyReceivedEventNameType;
  agency: Entity<AgencyInterface>;
  employee: Entity<EmployeeInterface>;
};

type PickedType = EventType & {
  name: PickedEventNameType;
  employee: Entity<EmployeeInterface>;
};

type ShipmentEventTypes =
  | PlacedType
  | ConfirmedType
  | PickedType
  | AgencyReceivedType
  | HubReceivedType
  | ShippedType
  | FailedAttemptType
  | ReturnType;

export interface ShipmentInterface {
  _id?: MongooseID;
  code: string;
  referenceNumber: string;
  consignorType: Enums.ShipmentConsignorEnum;
  consignor: Entity<CompanyInterface | ClientInterface>;
  consigneeType: Enums.ShipmentConsigneeEnum;
  consignee: Entity<CompanyInterface | ClientInterface>;
  isInCity: boolean;
  originAgency: Entity<AgencyInterface>;
  destinationAgency: Entity<AgencyInterface>;
  hub: Entity<HubInterface>;
  events: ShipmentEventTypes[];
  shippingFees: number;
  collectCashFees?: number;
  shipmentPrice?: number;
  notes?: string;
  products: ShipmentProductType[];
  returns: ShipmentProductType[];
}

export interface RideInterface {
  _id?: MongooseID;
  code: string;
  employees: Entity<EmployeeInterface[]>;
  shipments: Entity<ShipmentInterface[]>;
  vehicle?: Entity<VehicleInterface>;
  locations: {
    order: number;
    area: string;
    street: string;
    city: Entity<CityInterface>;
    lat?: number;
    lng?: number;
    meterReading?: number;
    name?: string;
    arrivalDate?: Date;
    departureDate?: Date;
  }[];
  startDate?: Date;
  endDate?: Date;
}

export interface CreateShipmentInterface {
  referenceNumber?: string;
  consigneeType: ShipmentConsigneeEnum;
  consignee: string;
  consignorType: ShipmentConsignorEnum;
  consignor: string;
  shippingFees: number;
  collectCashFees: number;
  shipmentPrice: number;
  originAgency?: string;
  destinationAgency: string;
  isInCity?: boolean;
  notes: string[];
  products: ShipmentProductType[];
}
