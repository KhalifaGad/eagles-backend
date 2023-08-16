import * as yup from "yup";

export const shipmentSchema = yup
  .object()
  .shape({
    referenceNumber: yup.string().required(),
    consigneeType: yup.mixed().oneOf(["Client", "Company"]),
    consignee: yup.string().required(),
    consignorType: yup.mixed().oneOf(["Client", "Company"]),
    consignor: yup.string(),
    shippingFees: yup.string().required(),
    collectCashFees: yup.string().required(),
    shipmentPrice: yup.number().default(0),
    originAgency: yup.string().required(),
    isInCity: yup.boolean(),
    notes: yup.array().of(yup.string()),
    products: yup
      .array()
      .of(
        yup.object({
          name: yup.string().required(),
          description: yup.string(),
          price: yup.string(),
        })
      )
      .min(1),
    returns: yup.array().of(
      yup.object({
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
          .string()
          .required()
          .trim()
          .matches(/^(19|20)\d\d([-])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/),
      })
    ),
  })
  .noUnknown();
