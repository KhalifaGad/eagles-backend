import * as yup from "yup";
import { addressSchema } from "./shared.validation";

export const employeeSchema = yup
  .object()
  .shape({
    name: yup.string().required(),
    mobile: yup.string().required(),
    email: yup.string().nullable().nullable(),
    position: yup.string().required(),
    nationalId: yup.string().required(),
    qualification: yup.string().required(),
    socialStatus: yup.string().required(),
    salary: yup.string().required(),
    agency: yup.string().nullable(),
    isAdmin: yup.boolean().nullable(),
    isAgencyAdmin: yup.boolean().nullable(),
    address: addressSchema.nullable(),
    hub: yup.string().nullable(),
    birthdate: yup
      .string()
      .nullable()
      .trim()
      .matches(/^(19|20)\d\d(-)(0[1-9]|1[012])\2(0[1-9]|[12]\d|3[01])$/),
  })
  .noUnknown();
