export enum AccountEnum {
  Merchant = "Merchant",
  Client = "Client",
  Employee = "Employee",
}

export enum RepaymentEnum {
  Cash = "Cash",
  Wallet = "Wallet",
  BankAccount = "BankAccount",
}

export enum CompanyEmployeesPositionEnum {
  Owner = "Owner",
  ShippingResponsible = "Shipping Responsible",
  MarketingManager = "Marketing Manager",
  GeneralManager = "General Manager",
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
