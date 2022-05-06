import { Types as MongooseTypes, PopulatedDoc as MongoosePopulatedDoc } from "mongoose";
import * as Enums from "./enums";

export type MongooseID = MongooseTypes.ObjectId;
type Entity<T> = NonNullable<MongoosePopulatedDoc<T>>;

type ShipmentProductType = {
  name: string;
  description?: string;
  price?: number;
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

export interface EmployeeInterface {
  _id?: MongooseID;
  name: string;
  mobile: string;
  email: string;
  birthdate: Date;
  position: string;
  nationalId: string;
  qualification: string;
  socialStatus: string;
  address: AddressInterface;
  salary: number;
}

type PickedType = EventType & {
  name: PickedEventNameType;
  employee: Entity<EmployeeInterface>;
};

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

type AgencyReceivedType = EventType & {
  name: AgencyReceivedEventNameType;
  agency: Entity<AgencyInterface>;
  employee: Entity<EmployeeInterface>;
};

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

type ShipmentEventTypes =
  | PlacedType
  | ConfirmedType
  | PickedType
  | AgencyReceivedType
  | HubReceivedType
  | ShippedType
  | FailedAttemptType
  | ReturnType;

export interface ClientInterface {
  _id?: MongooseID;
  firstName: string;
  familyName: string;
  mobile: string;
  address: AddressInterface;
  birthdate?: Date;
  email?: string;
}

export interface RepaymentConfigInterface {
  default: Enums.RepaymentEnum;
  walletNumber?: string;
  accountNumber?: string;
  bank?: string;
  branch?: string;
  swftCode?: string;
  iban?: string;
}

export interface CompanyInterface {
  _id?: MongooseID;
  name: string;
  companyType: Enums.CompaniesEnum;
  commercialNo?: string;
  taxNo?: string;
  address: AddressInterface;
  urls: { value: string; description: string }[];
  repaymentConfig: RepaymentConfigInterface;
}

export interface MerchantInterface {
  _id?: MongooseID;
  firstName: string;
  familyName: string;
  company: Entity<CompanyInterface>;
  position: Enums.CompanyEmployeesPositionEnum;
  mobile?: string;
  email?: string;
  address?: AddressInterface;
  birthdate?: Date;
}

export interface CredentialInterface {
  _id?: MongooseID;
  mobile: string;
  password: string;
  accountType: Enums.AccountEnum;
  account: Entity<EmployeeInterface | ClientInterface | MerchantInterface>;
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

export interface ShipmentInterface {
  _id?: MongooseID;
  code: string;
  consignorType: Enums.ShipmentConsignorEnum;
  consignor: Entity<CompanyInterface | ClientInterface>;
  consigneeType: Enums.ShipmentConsigneeEnum;
  consignee: Entity<CompanyInterface | ClientInterface>;
  isInCity: boolean;
  originAgency: Entity<AgencyInterface>;
  destinationAgency: Entity<AgencyInterface>;
  events: ShipmentEventTypes[];
  shippingFees: number;
  shouldCollectCash: boolean;
  collectCashFees?: number;
  notes?: string;
  products: ShipmentProductType[];
  returns: ShipmentProductType[];
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
  license: {
    id: string;
    startDate: Date;
    renewalDate: Date;
  };
  insurance: {
    startDate: Date;
    renewalDate: Date;
  };
}

export interface RideInterface {
  _id?: MongooseID;
  code: string;
  employees: Entity<EmployeeInterface[]>;
  shipments: Entity<ShipmentInterface[]>;
  vehicle: Entity<VehicleInterface>;
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
  startDate: Date;
  endDate?: Date;
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
