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
  isServicePaid;
  constructor({
    _id,
    originBranchId,
    destinationBranchId,
    originCustomerType,
    originCustomer,
    destinationCustomerType,
    destinationCustomer,
    description,
    products,
    packCode,
    isCOD,
    totalPackPrice,
    servicePrice,
    date,
    shippingStatus,
    isServicePaid,
  }) {
    this._id = _id;
    this.originBranchId = originBranchId;
    this.destinationBranchId = destinationBranchId;
    this.originCustomerType = originCustomerType;
    this.originCustomer = originCustomer;
    this.destinationCustomerType = destinationCustomerType;
    this.destinationCustomer = destinationCustomer;
    this.description = description;
    this.products = products;
    this.packCode = packCode;
    this.isCOD = isCOD;
    this.totalPackPrice = totalPackPrice;
    this.servicePrice = servicePrice;
    this.date = date;
    this.shippingStatus = shippingStatus;
    this.isServicePaid = isServicePaid;
  }
}

export const SHIPPING_STATUSES = [
  "origin_branch",
  "shipped_from_origin",
  "back_to_origin",
  "master_branch", // "warehouse" -> momken kaza makan
  "shipped_to_destination_branch",
  "destination_branch",
  "shipped_to_client",
  "delivered",
  "rejected",
  "cannot_reach",
];

export const SHIPPING_STATUSES_INDEXES = {
  originBranch: 0,
  shippedFromOrigin: 1,
  backToOrigin: 2,
  masterBranch: 3,
  shippedToDestination_branch: 4,
  destinationBranch: 5,
  shippedToClient: 6,
  delivered: 7,
  rejected: 8,
  cannotReach: 9,
};

export default PackEntity;
