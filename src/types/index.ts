export interface AddressEntity {
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

export interface CityEntity {
  name: string;
}

export interface ClientEntity {
  firstName: string;
  lastName: string;
  mobile: string;
  branchId: string;
  addresses: AddressEntity[];
}

export interface CompanyManagerEntity {
  name: string;
  departmentName: string;
  mobile: string;
  companyId: string;
}

export interface CompanyEntity {
  name: string;
  businessType: string;
  address: AddressEntity;
  telephone: string;
  managers: CompanyManagerEntity[];
  ownerName: string;
  ownerMobile: string;
  branchId: string;
}

export interface EmployeeEntity {
  name: string;
  mobile: string;
  password: string;
  idNumber: number;
  loginPermission: boolean;
  branchId: string;
  address: AddressEntity;
  employeeRoleId: string;
}

export interface BranchEntity {
  name: string;
  commercialNumber: number;
  taxCardNumber: number;
  address: AddressEntity;
  ownerId: string;
  employees: EmployeeEntity[];
  telephone: number;
}

export interface EmployeeRoleEntity {
  name: string;
}

export interface PackEntity {
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
  shippingStatus: any;
  isServicePaid: any;
}

export enum ShippingStatus {
  originBranch = "origin_branch",
  shippedFromOrigin = "shipped_from_origin",
  backToOrigin = "back_to_origin",
  masterBranch = "master_branch", // "warehouse" -> momken kaza makan
  shippedToDestination_branch = "shipped_to_destination_branch",
  destinationBranch = "destination_branch",
  shippedToClient = "shipped_to_client",
  delivered = "delivered",
  rejected = "rejected",
  cannotReach = "cannot_reach",
}

export interface ProductEntity {
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  price: number;
  weight: number;
  height: number;
  width: number;
  companyId: string;
  branchId: string;
}

export interface VisitEntity {
  employeeId: string;
  companyId: string;
  packs: PackEntity[];
  rejectionReason: string;
}

export interface BranchOwnerEntity {
  name: string;
  mobile: string;
  password: string;
  idNumber: number;
  address: AddressEntity;
  branches: BranchEntity[];
}
