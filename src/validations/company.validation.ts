import * as yup from "yup";
import { addressSchema } from "./shared.validation";

export const companyEmployeeSchema = yup
  .object()
  .shape({
    _id: yup.string().nullable(),
    name: yup.string().required(),
    position: yup
      .mixed()
      .oneOf(["OTHER", "OWNER", "SHIPPING_RESPONSIBLE", "MARKETING_MANAGER", "GENERAL_MANAGER"])
      .required(),
    email: yup.string().email().nullable(),
    mobile: yup.string().required(),
    password: yup.string().nullable(),
  })
  .noUnknown();

export const companySchema = yup
  .object()
  .shape({
    _id: yup.string().nullable(),
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
    employees: yup.array().of(companyEmployeeSchema).min(1).required(),
  })
  .noUnknown();
