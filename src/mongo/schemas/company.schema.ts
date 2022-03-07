import { Schema, model, Document } from "mongoose";
import { CompanyEntity } from "../../types";
import { companyManagerSchema, addressSchema } from "./shared.schema";

export const companySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  businessType: {
    type: String,
    required: true,
  },
  address: {
    type: addressSchema,
    required: true,
  },
  telephone: {
    type: String,
    required: true,
  },
  managers: {
    type: [{ type: companyManagerSchema, required: true }],
    default: [],
  },
  ownerName: {
    type: String,
  },
  ownerMobile: {
    type: String,
  },
  branchId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Branch",
  },
});

companySchema.index({ name: 1 });

export interface CompanyDocument extends CompanyEntity, Document {
  _id: string;
}

export const companyModel = model<CompanyDocument>("Company", companySchema);
