export interface AddressInterface {
  cityId: string;
  area: string;
  street: string;
  block: string;
  floorNumber: number;
  apartmentNumber: number;
  landmark: string;
  lat: number;
  lng: number;
}

export interface CityInterface {
  name: string;
}

export interface UserInterface {
  firstName: string;
  lastName: string;
  mobile: string;
  address: AddressInterface;
  branchId: string;
  roleId: string;
  isAdmin: boolean;
}

export interface OrganizationManagerInterface {
  name: string;
  departmentName: string;
  mobile: string;
  organizationId: string;
}

export interface OrganizationInterface {
  name: string;
  businessType: string;
  address: AddressInterface;
  telephone: string;
  managers: OrganizationManagerInterface[];
  ownerName: string;
  ownerMobile: string;
  branchId: string;
}

export interface EmployeeInterface {
  name: string;
  mobile: string;
  password: string;
  idNumber: number;
  loginPermission: boolean;
  branchId: string;
  address: AddressInterface;
  roleId: string;
}

export interface BranchInterface {
  name: string;
  commercialNumber: number;
  taxCardNumber: number;
  address: AddressInterface;
  ownerId: string;
  employees: EmployeeInterface[];
  telephone: number;
}

export interface RoleInterface {
  name: string;
}

export interface PackInterface {
  originBranchId: number;
  destinationBranchId: number;
  originCustomerType: any;
  originCustomer: any;
  destinationCustomerType: any;
  destinationCustomer: any;
  description: any;
  products: any;
  packCode: any;
  isCOD: any;
  totalPackPrice: any;
  servicePrice: any;
  date: any;
  ShippingStatusEnum: any;
  isServicePaid: any;
}

export enum ShippingStatusEnum { // TODO
  originBranch = "origin_branch",
  shippedFromOrigin = "shipped_from_origin",
  backToOrigin = "back_to_origin",
  masterBranch = "master_branch", // "warehouse" -> momken kaza makan
  shippedToDestination_branch = "shipped_to_destination_branch",
  destinationBranch = "destination_branch",
  shippedTouser = "shipped_to_user",
  delivered = "delivered",
  rejected = "rejected",
  cannotReach = "cannot_reach",
}

export enum BusinessTypeEnum { // TODO
  socialMedia = "social media",
  company = "company",
}

export interface ProductInterface {
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  price: number;
  weight: number;
  height: number;
  width: number;
  organizationId: string;
  branchId: string;
}

export interface VehicleInterface {
  plateNumber: string;
}

export interface BranchOwnerInterface {
  name: string;
  mobile: string;
  password: string;
  idNumber: number;
  address: AddressInterface;
  branches: BranchInterface[];
}

export interface RideInterface {
  origin: AddressInterface;
  destination: AddressInterface;
  driverId: string;
  vehicleId: string;
  orders: any[];
}
