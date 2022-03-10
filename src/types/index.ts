// *==========================================================================
// *                                 Enums
// *==========================================================================
// TODO
export const ShippingStatusEnum = [
  "origin_branch",
  "shipped_from_origin",
  "back_to_origin",
  "master_branch", // "warehouse" -> momken kaza makan
  "shipped_to_destination_branch",
  "destination_branch",
  "shipped_to_user",
  "delivered",
  "rejected",
  "cannot_reach",
] as const;

export const BusinessTypeEnum = ["social_media", "company"] as const;

export const OrderTypeEnum = [
  "business_to_business",
  "business_to_consumer",
] as const;

// *==========================================================================
// *                              Interfaces
// *==========================================================================

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

export interface ProductInterface {
  _id?: string;
  name: { arabic: string; english: string };
  description: { arabic: string; english: string };
  price: number;
  weight: number;
  height: number;
  width: number;
  organizationId: string;
  branchId: string;
}

export interface PackageInterface {
  productId: string;
  quality: number;
}

export interface FulfillerInterface {
  name: string;
  organizationId: string;
  branchId: string;
  origin: AddressInterface;
  shippingStatus: typeof ShippingStatusEnum[number];
  packages: PackageInterface[];
}

export interface VehicleInterface {
  _id?: string;
  plateNumber: string;
}

export interface RoleInterface {
  _id?: string;
  name: string;
}

export interface CityInterface {
  _id?: string;
  name: string;
}

export interface UserInterface {
  _id?: string;
  firstName: string;
  lastName: string;
  mobile: string;
  address: AddressInterface;
  branchId: string;
  roleId: string;
  permissions: { access: boolean; edit: boolean }; // TODO
  isAdmin: boolean;
}

export interface RideInterface {
  _id?: string;
  origin: AddressInterface;
  destination: AddressInterface;
  driverId: string;
  vehicleId: string;
  packages: PackageInterface[];
  isCompleted: boolean;
}

export interface OrganizationInterface {
  _id?: string;
  name: string;
  businessType: typeof BusinessTypeEnum[number];
  commercialNumber: string;
  taxCardNumber: string;
  owner: { name: string; mobile: string };
}

export interface OrderInterface {
  _id?: string;
  orderType: typeof OrderTypeEnum[number];
  destination: AddressInterface;
  totalPrice: number;
  notes: string;
  fulfillers: FulfillerInterface[];
}

export interface BranchInterface {
  _id?: string;
  telephone: string;
  address: AddressInterface;
  mangers: {
    name: string;
    mobile: string;
    department: string;
  }[];
  organizationId: string;
}
