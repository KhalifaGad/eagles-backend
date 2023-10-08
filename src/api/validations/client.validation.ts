import { addressSchema } from "./shared.validation.js";
import * as yup from "yup";

export const clientSchema = yup.object().shape({
  _id: yup.string().nullable(),
  name: yup.string().required(),
  address: addressSchema.required(),
  email: yup.string(),
  mobile: yup.string().required(),
  secondMobile: yup.string(),
  defaultNearestAgency: yup.string().nullable(),
  birthdate: yup
    .string()
    .trim()
    .matches(/^(19|20)\d\d([-])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/)
    .nullable(),
});
