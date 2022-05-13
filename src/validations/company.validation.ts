import * as yup from "yup";
import { addressSchema } from "./shared.validation";

export const companySchema = yup
  .object()
  .shape({
    name: yup.string().required(),
    commercialNo: yup.string(),
    taxNo: yup.string(),
    urls: yup.array().of(
      yup.object({
        value: yup.string().required(),
        description: yup.string(),
      })
    ),
    repaymentConfig: yup.object({
      default: yup.mixed().oneOf(["Cash", "Wallet", "BankAccount"]).required(),
      walletNumber: yup.string(),
      accountNumber: yup.string(),
      bank: yup.string(),
      branch: yup.string(),
      swftCode: yup.string(),
      iban: yup.string(),
    }),
    address: addressSchema.required(),
  })
  .noUnknown();
