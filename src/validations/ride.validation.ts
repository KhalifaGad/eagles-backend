import * as yup from "yup";

export const rideSchema = yup
  .object()
  .shape({
    code: yup.string().required(),
    employees: yup.array().of(yup.string()).required().min(2),
    vehicle: yup.string().required(),
    shipments: yup.array().of(yup.string()).required(),
    locations: yup
      .array()
      .of(
        yup.object({
          order: yup.number().required(),
          city: yup.string().required(),
          area: yup.string().required(),
          street: yup.string().required(),
          lat: yup.number(),
          lng: yup.number(),
          meterReading: yup.number(),
          name: yup.string(),
          arrivalDate: yup
            .string()
            .trim()
            .matches(/^(19|20)\d\d([-])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/),
          departureDate: yup
            .string()
            .trim()
            .matches(/^(19|20)\d\d([-])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/),
        })
      )
      .min(3),
    startDate: yup
      .string()
      .required()
      .trim()
      .matches(/^(19|20)\d\d([-])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/),
    endDate: yup
      .string()
      .trim()
      .matches(/^(19|20)\d\d([-])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/),
  })
  .noUnknown();
