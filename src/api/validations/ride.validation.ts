import * as yup from "yup";

export const createRideSchema = yup
  .object()
  .shape({
    employees: yup.array().of(yup.string()).required().min(2),
    rideTemplateId: yup.string().required(),
  })
  .noUnknown();

export const rideSchema = yup
  .object()
  .shape({
    _id: yup.string(),
    code: yup.string().nullable(),
    employees: yup.array().of(yup.string()).min(2),
    shipments: yup.array().of(yup.string()).nullable(),
    steps: yup
      .array()
      .of(
        yup.object({
          sequence: yup.number().min(1).required(),
          stepLocationType: yup.mixed().oneOf(["Agency", "Hub"]).required(),
          stepLocationEntity: yup.string().required(),
        })
      )
      .min(3),
    startDate: yup
      .string()
      .trim()
      .matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/),
    endDate: yup
      .string()
      .trim()
      .matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/),
  })
  .noUnknown();
