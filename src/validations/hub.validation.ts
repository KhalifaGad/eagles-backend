import * as yup from "yup";
import { addressSchema } from "./shared.validation";

export const hubSchema = yup
  .object()
  .shape({
    name: yup.string().required(),
    address: addressSchema.required(),
  })
  .noUnknown();
