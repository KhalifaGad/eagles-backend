import { Schema, model } from "mongoose";
import { addressSchema } from "./shared";
import { CompanyEmployeesPositionEnum, MerchantInterface } from "../../types";
import { Schemas } from "../../../constants";

const merchantSchema = new Schema<MerchantInterface>(
  {
    firstName: { type: String, required: true },
    familyName: { type: String, required: true },
    company: {
      type: Schema.Types.ObjectId,
      ref: Schemas.company,
      required: true,
    },
    position: {
      type: String,
      enum: CompanyEmployeesPositionEnum,
      required: true,
    },
    birthdate: { type: Date },
    address: { type: addressSchema },
    email: { type: String },
    mobile: { type: String },
  },
  { timestamps: true }
);

export const MerchantModel = model<MerchantInterface>(Schemas.merchant, merchantSchema);
