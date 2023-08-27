import * as yup from "yup";

export const createRideSchema = yup
  .object()
  .shape({
    employees: yup.array().of(yup.string()).required().min(2),
    shipments: yup.array().of(yup.string()).default([]).required(),
    rideTemplateId: yup.string().required(),
    startDate: yup
      .string()
      .trim()
      .matches(/^(19|20)\d\d([-])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/),
    endDate: yup
      .string()
      .trim()
      .matches(/^(19|20)\d\d(-)(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/),
  })
  .noUnknown();

export const rideSchema = yup
  .object()
  .shape({
    code: yup.string().nullable(),
    employees: yup.array().of(yup.string()).required().min(2),
    shipments: yup.array().of(yup.string()).default([]).required(),
    steps: yup
      .array()
      .of(
        yup.object({
          sequence: yup.number().min(1).required(),
          stepLocationType: yup.mixed().oneOf(["Agency", "Hub"]).required(),
          stepLocationEntity: yup.string().required(),
        })
      )
      .min(3)
      .required(),
    startDate: yup
      .string()
      .trim()
      .matches(/^(19|20)\d\d([-])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/),
    endDate: yup
      .string()
      .trim()
      .matches(/^(19|20)\d\d([-])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/),
  })
  .noUnknown();
