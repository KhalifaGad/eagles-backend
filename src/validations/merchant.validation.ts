import * as yup from "yup";
import { addressSchema } from "./shared.validation";

export const merchantSchema = yup
  .object()
  .shape({
    firstName: yup.string().required(),
    familyName: yup.string().required(),
    company: yup.string().required(),
    position: yup.mixed().oneOf(["Owner", "Shipping Responsible", "Marketing Manager", "General Manager"]).required(),
    address: addressSchema.required(),
    email: yup.string().email().required(),
    mobile: yup.string().required(),
    birthdate: yup
      .string()
      .required()
      .trim()
      .matches(/^(19|20)\d\d([-])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/),
  })
  .noUnknown();
