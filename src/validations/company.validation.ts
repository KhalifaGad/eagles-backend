import * as yup from "yup";
import { addressSchema } from "./shared.validation";

export const companySchema = yup
  .object()
  .shape({
    name: yup.string().required(),
    commercialNo: yup.string(),
    taxNo: yup.string(),
    businessType: yup.string().required(),
    urls: yup.array().of(
      yup.object({
        value: yup.string().required(),
        description: yup.string(),
      })
    ),
    companyType: yup.mixed().oneOf(["ECommerce", "Traditional"]).required(),
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
