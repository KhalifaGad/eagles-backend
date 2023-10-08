import * as yup from "yup";

export const vehicleSchema = yup
  .object()
  .shape({
    code: yup.string().required(),
    chassisNo: yup.string().required(),
    color: yup.string().required(),
    model: yup.string().required(),
    tonnage: yup.string().required(),
    type: yup.string().required(),
    condition: yup.string().required(),

    licenseId: yup.string().required(),
    licenseStartDate: yup
      .string()
      .required()
      .trim()
      .matches(/^(19|20)\d\d([-])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/),
    licenseRenewalDate: yup
      .string()
      .required()
      .trim()
      .matches(/^(19|20)\d\d([-])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/),

    insuranceStartDate: yup
      .string()
      .required()
      .trim()
      .matches(/^(19|20)\d\d([-])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/),
    insuranceRenewalDate: yup
      .string()
      .required()
      .trim()
      .matches(/^(19|20)\d\d([-])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/),
  })
  .noUnknown();
