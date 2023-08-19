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

export enum ShipmentDestinationEnum {
  AGENCY = "AGENCY",
  HUB = "HUB",
  CONSIGNEE = "CONSIGNEE",
}
