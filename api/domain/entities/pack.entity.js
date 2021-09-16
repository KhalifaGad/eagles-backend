class PackEntity {
  _id;
  originBranchId;
  destinationBranchId;
  originCustomerType;
  originCustomer;
  destinationCustomerType;
  destinationCustomer;
  description;
  products;
  packCode;
  isCOD;
  totalPackPrice;
  servicePrice;
  date;
  shippingStatus;
}

export const SHIPPING_STATUSES = [
  "origin_branch",
  "shipped_from_origin",
  "back_to_origin",
  "destination_branch",
  "shipped_to_client",
  "delivered",
  "rejected",
  "cannot_reach",
];

export default PackEntity;
