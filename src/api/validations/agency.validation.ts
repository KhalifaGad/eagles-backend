import { addressSchema } from "./shared.validation.js";
import * as yup from "yup";

export const agencySchema = yup
  .object()
  .shape({
    _id: yup.string().nullable(),
    name: yup.string().required(),
    mobile: yup.string().required(),
    telephone: yup.string().required(),
    address: addressSchema.required(),
    inCityPackagePercentage: yup.number().required(),
    receivedPackagePercentage: yup.number().required(),
    sentPackagePercentage: yup.number().required(),
    shareBusPercentage: yup.number().required(),
    relatedHub: yup.string().required(),
    createdAt: yup.string().transform(() => undefined),
    updatedAt: yup.string().transform(() => undefined),
  })
  .noUnknown();
