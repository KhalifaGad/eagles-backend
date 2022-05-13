import * as yup from "yup";
import { addressSchema } from "./shared.validation";

export const agencySchema = yup
  .object()
  .shape({
    name: yup.string().required(),
    mobile: yup.string().required(),
    telephone: yup.string().required(),
    address: addressSchema.required(),
    inCityPackagePercentage: yup.number().required(),
    receivedPackagePercentage: yup.number().required(),
    sentPackagePercentage: yup.number().required(),
    shareBusPercentage: yup.number().required(),
  })
  .noUnknown();
