export enum AccountEnum {
  Company = "Company",
  Client = "Client",
  Employee = "Employee",
}

export enum RepaymentEnum {
  Cash = "Cash",
  Wallet = "Wallet",
  BankAccount = "BankAccount",
}

export enum CompanyEmployeesPositionEnum {
  Owner = "OWNER",
  ShippingResponsible = "SHIPPING_RESPONSIBLE",
  MarketingManager = "MARKETING_MANAGER",
  GeneralManager = "GENERAL_MANAGER",
  Other = "OTHER",
}

export enum CompaniesEnum {
  ECommerce = "ECommerce",
  Traditional = "Traditional",
}

export enum ShipmentConsignorEnum {
  Client = "Client",
  Company = "Company",
}

export enum ShipmentConsigneeEnum {
  Client = "Client",
  Company = "Company",
}

export enum ShipmentEventNamesEnum {
  PLACED = "PLACED",
  CONFIRMED = "CONFIRMED",
  PICKED = "PICKED",
  AGENCY_RECEIVED = "AGENCY_RECEIVED",
  HUB_RECEIVED = "HUB_RECEIVED",
  SHIPPED = "SHIPPED",
  FAILED_ATTEMPT = "FAILED_ATTEMPT",
  RETURN = "RETURN",
}

export enum ShipmentStatuses {
  PLACED = "PLACED",
  CONSIGNOR_PICKED = "CONSIGNOR_PICKED",
  ORIGIN_AGENCY_SHIPPED = "ORIGIN_AGENCY_SHIPPED",
  ORIGIN_HOTSPOT_RECEIVED = "ORIGIN_HOTSPOT_RECEIVED",
  SHIPPED_TO_HUB = "SHIPPED_TO_HUB",
  HUB_RECEIVED = "HUB_RECEIVED",
  SHIPPED_TO_DESTINATION_HOTSPOT = "SHIPPED_TO_DESTINATION_HOTSPOT",
  DESTINATION_HOTSPOT_RECEIVED = "DESTINATION_HOTSPOT_RECEIVED",
  SHIPPED_TO_DESTINATION_AGENCY = "SHIPPED_TO_DESTINATION_AGENCY",
  DESTINATION_AGENCY_RECEIVED = "DESTINATION_AGENCY_RECEIVED",
  SHIPPED_TO_CUSTOMER = "SHIPPED_TO_CUSTOMER",
  DELIVERED = "DELIVERED",
  FAILED_ATTEMPT = "FAILED_ATTEMPT",
  RETURNED_TO_ORIGIN = "RETURNED_TO_ORIGIN",
}

export enum DeliveryReceiptAttributedToEnum {
  Hub = "Hub",
  Agency = "Agency",
  Ride = "Ride"
}

export enum ShipmentDestinationEnum {
  AGENCY = "AGENCY",
  HUB = "HUB",
  CONSIGNEE = "CONSIGNEE",
}

export enum StepLocationTypeEnum {
  Agency = "Agency",
  Hub = "Hub",
}
