import * as yup from "yup";
import { addressSchema } from "./shared.validation.js";

export const clientSchema = yup.object().shape({
  _id: yup.string().nullable(),
  name: yup
    .string()
    .transform(value => {
      if (!value) return null;
      return value.trim();
    })
    .required(),
  address: addressSchema.required(),
  email: yup
    .string()
    .transform(value => {
      if (!value) return null;
      return value.trim();
    })
    .default(null),
  mobile: yup
    .string()
    .transform(value => {
      if (!value) return null;
      return value.trim();
    })
    .required(),
  secondMobile: yup.string().transform(value => {
    if (!value) return null;
    return value.trim();
  }),
  defaultNearestAgency: yup.string().nullable(),
  birthdate: yup
    .string()
    .trim()
    .matches(/^(19|20)\d\d([-])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/)
    .nullable(),
});
