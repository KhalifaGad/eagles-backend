import { Schema, model } from "mongoose";
import { CompanyInterface, RepaymentEnum } from "../../types";
import { addressSchema } from "./shared.schema";
import { Schemas } from "../../../constants";

const companyURLSchema = {
  value: { type: String, required: true },
  description: { type: String },
};

const repaymentConfigSchema = {
  default: {
    type: String,
    enum: RepaymentEnum,
    required: true,
  },
  walletNumber: { type: String },
  accountNumber: { type: String },
  bank: { type: String },
  branch: { type: String },
  swftCode: { type: String },
  iban: { type: String },
};

const companySchema = new Schema<CompanyInterface>(
  {
    name: { type: String, required: true, unique: true },
    commercialNo: { type: String },
    taxNo: { type: String },
    urls: [companyURLSchema],
    repaymentConfig: { type: repaymentConfigSchema, required: true },
    address: { type: addressSchema, required: true },
  },
  { timestamps: true, versionKey: false }
);

export const CompanyModel = model<CompanyInterface>(Schemas.company, companySchema);
