import { model, Schema } from "mongoose";
import {
  CompaniesEnum,
  CompanyEmployeesPositionEnum,
  CompanyInterface,
  MerchantInterface,
  RepaymentEnum,
} from "../../types";
import { Schemas } from "../constants";
import { addressSchema } from "./shared.schema";

const companyURL = {
  value: { type: String, required: true },
  description: { type: String },
};

const repaymentConfig = {
  default: {
    type: String,
    enum: RepaymentEnum,
    default: RepaymentEnum.Cash,
    required: true,
  },
  walletNumber: { type: String },
  accountNumber: { type: String },
  bank: { type: String },
  branch: { type: String },
  swftCode: { type: String },
  iban: { type: String },
};

const CompanyEmployeeSchema = new Schema<MerchantInterface>(
  {
    name: { type: String, required: true },
    position: {
      type: String,
      enum: CompanyEmployeesPositionEnum,
      required: true,
    },
    email: { type: String },
    isAdmin: { type: Boolean, default: false },
    mobile: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const companySchema = new Schema<CompanyInterface>(
  {
    name: { type: String, required: true, unique: true },
    commercialNo: { type: String },
    taxNo: { type: String },
    businessType: { type: String, required: true },
    urls: [companyURL],
    repaymentConfig: { type: repaymentConfig, required: true },
    address: { type: addressSchema, required: true },
    companyType: {
      type: String,
      enum: CompaniesEnum,
      required: true,
      default: CompaniesEnum.Traditional,
    },
    employees: [CompanyEmployeeSchema],
  },
  { timestamps: true, versionKey: false }
);

export const CompanyModel = model<CompanyInterface>(Schemas.company, companySchema);
