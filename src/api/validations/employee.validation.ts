import * as yup from "yup";
import { addressSchema } from "./shared.validation.js";

export const employeeSchema = yup
  .object()
  .shape({
    name: yup.string().required(),
    mobile: yup.string().required(),
    email: yup.string().nullable().nullable(),
    position: yup.string().required(),
    nationalId: yup.string().required(),
    qualification: yup.string().nullable(),
    socialStatus: yup.string().nullable(),
    salary: yup.string().required(),
    agency: yup.string().nullable(),
    isAdmin: yup.boolean().nullable(),
    isCustomerService: yup.boolean().nullable(),
    isAgencyAdmin: yup.boolean().nullable(),
    canJoinRides: yup.boolean().nullable(),
    address: addressSchema.nullable(),
    hub: yup.string().nullable(),
    password: yup.string().min(6).nullable(),
    birthdate: yup
      .string()
      .nullable()
      .trim()
      .matches(/^(19|20)\d\d(-)(0[1-9]|1[012])\2(0[1-9]|[12]\d|3[01])$/),
  })
  .noUnknown();
