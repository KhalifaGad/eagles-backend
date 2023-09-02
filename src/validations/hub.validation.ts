import * as yup from "yup";
import { addressSchema } from "./shared.validation";

export const hubSchema = yup
  .object()
  .shape({
    _id: yup.string().nullable(),
    name: yup.string().required(),
    address: addressSchema.required(),
    isHotspot: yup.boolean().required(),
    parentHub: yup.string().when("isHotspot", {
      is: true,
      then: yup.string().required(),
      otherwise: yup.string().nullable(),
    }),
    createdAt: yup.string().transform(() => undefined),
    updatedAt: yup.string().transform(() => undefined),
  })
  .noUnknown();
