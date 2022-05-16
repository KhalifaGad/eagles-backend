import * as yup from "yup";
import { addressSchema } from "./shared.validation";

export const clientSchema = yup
  .object()
  .shape({
    firstName: yup.string().required(),
    familyName: yup.string().required(),
    address: addressSchema.required(),
    email: yup.string().required(),
    mobile: yup.string().required(),
    secondMobile: yup.string(),
    birthdate: yup
      .string()
      .required()
      .trim()
      .matches(/^(19|20)\d\d([-])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/),
  })
  .noUnknown();
