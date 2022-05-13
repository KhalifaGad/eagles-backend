import * as yup from "yup";
import { addressSchema } from "./shared.validation";

export const employeeSchema = yup
  .object()
  .shape({
    name: yup.string().required(),
    mobile: yup.string().required(),
    email: yup.string().required(),
    position: yup.string().required(),
    nationalId: yup.string().required(),
    qualification: yup.string().required(),
    socialStatus: yup.string().required(),
    salary: yup.string().required(),
    address: addressSchema.required(),
    birthdate: yup
      .string()
      .required()
      .trim()
      .matches(/^(19|20)\d\d([-])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/),
  })
  .noUnknown();
