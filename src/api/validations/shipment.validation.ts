import * as yup from "yup";

const shipmentStatuses = [
  "PLACED",
  "CONSIGNOR_PICKED",
  "ORIGIN_AGENCY_SHIPPED",
  "ORIGIN_HOTSPOT_RECEIVED",
  "SHIPPED_TO_HUB",
  "HUB_RECEIVED",
  "SHIPPED_TO_DESTINATION_HOTSPOT",
  "DESTINATION_HOTSPOT_RECEIVED",
  "SHIPPED_TO_DESTINATION_AGENCY",
  "DESTINATION_AGENCY_RECEIVED",
  "SHIPPED_TO_CUSTOMER",
  "DELIVERED",
  "FAILED_ATTEMPT",
  "RETURNED_TO_ORIGIN",
];

export const shipmentSchema = yup
  .object()
  .shape({
    _id: yup.string(),
    code: yup.string(),
    referenceNumber: yup.string(),
    consigneeType: yup.mixed().oneOf(["Client", "Company"]),
    consignee: yup.string(),
    consignorType: yup.mixed().oneOf(["Client", "Company"]),
    consignor: yup.string(),
    shippingFees: yup.number(),
    collectCashFees: yup.number(),
    shipmentPrice: yup.number(),
    originAgency: yup.string(),
    originHotspot: yup.string(),
    destinationHotspot: yup.string(),
    destinationAgency: yup.string(),
    isInCity: yup.boolean(),
    notes: yup.array().of(yup.string()),
    hub: yup.string(),
    failedAttemptsCount: yup.number(),
    isReturning: yup.boolean(),
    status: yup.mixed().oneOf(shipmentStatuses),
    searchables: yup.object({
      consignorName: yup.string(),
      consigneeName: yup.string(),
      consignorMobile: yup.string(),
      consigneeMobile: yup.string(),
      originAgencyName: yup.string(),
      destinationAgencyName: yup.string(),
    }),
    createdAt: yup
      .mixed()
      .transform(value => new Date(value))
      .required(),
    updatedAt: yup
      .mixed()
      .transform(value => new Date(value))
      .required(),
    products: yup
      .array()
      .of(
        yup.object({
          _id: yup.string(),
          name: yup.string(),
          description: yup.string(),
          price: yup.number(),
        })
      )
      .min(1),
    returns: yup.array().of(
      yup.object({
        _id: yup.string(),
        name: yup.string().required(),
        description: yup.string(),
        price: yup.number(),
      })
    ),
    events: yup.array().of(
      yup.object({
        name: yup
          .mixed()
          .oneOf([
            "PLACED",
            "CONFIRMED",
            "PICKED",
            "AGENCY_RECEIVED",
            "HUB_RECEIVED",
            "SHIPPED",
            "FAILED_ATTEMPT",
            "RETURN",
          ])
          .required(),
        employee: yup.string(),
        hub: yup.string(),
        destinationType: yup.mixed().oneOf(["AGENCY", "HUB", "CONSIGNEE"]),
        products: yup.array().of(
          yup.object({
            name: yup.string().required(),
            description: yup.string(),
            price: yup.string(),
          })
        ),
        date: yup
          .mixed()
          .transform(value => new Date(value))
          .required(),
      })
    ),
  })
  .noUnknown();

export const createShipmentSchema = yup.object().shape({
  referenceNumber: yup.string(),
  consigneeType: yup.mixed().oneOf(["Client", "Company"]),
  consignee: yup.string().required(),
  consignorType: yup.mixed().oneOf(["Client", "Company"]).required(),
  consignor: yup.string().required(),
  shippingFees: yup.number().default(0),
  collectCashFees: yup.number().default(0),
  shipmentPrice: yup.number().default(0),
  originAgency: yup.string(),
  destinationAgency: yup.string(),
  isInCity: yup.boolean(),
  notes: yup.array().of(yup.string()).nullable(),
  products: yup
    .array()
    .of(
      yup.object({
        name: yup.string().required(),
        description: yup.string(),
        price: yup.number().default(0),
      })
    )
    .min(1),
});
