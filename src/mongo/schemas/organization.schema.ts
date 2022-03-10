import { Schema, model, Document } from "mongoose";
import { OrganizationInterface, BusinessTypeEnum } from "../../types";

export const organizationSchema = new Schema({
  name: { type: String, required: true, unique: true },
  businessType: {
    type: String,
    enum: BusinessTypeEnum,
    required: true,
  },
  commercialNumber: { type: String, required: true, unique: true },
  taxCardNumber: { type: String, required: true, unique: true },
  owner: {
    name: { type: String, required: true },
    mobile: { type: String, required: true },
  },
}).index({ name: 1 });

export interface OrganizationDocument extends OrganizationInterface, Document {
  _id: string;
}

export const organizationModel = model<OrganizationDocument>(
  "organizations",
  organizationSchema
);
