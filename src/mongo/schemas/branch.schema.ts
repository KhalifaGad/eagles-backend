import { Schema, model, Document } from "mongoose";
import { BranchEntity } from "../../types";
import { addressSchema, branchOwnerSchema } from "./shared.schema";
import { employeeSchema } from "./employee.schema";

export const branchSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  commercialNumber: {
    type: String,
    required: true,
    unique: true,
  },
  taxCardNumber: {
    type: String,
    required: true,
  },
  address: {
    type: addressSchema,
    required: true,
  },
  owner: {
    type: branchOwnerSchema,
    required: true,
  },
  employees: {
    type: [{ type: employeeSchema, required: true }],
    default: [],
  },
  telephone: {
    type: String,
    required: true,
  },
});

branchSchema.index({ name: 1 });

export interface BranchDocument extends BranchEntity, Document {
  _id: string;
}

export const branchModel = model<BranchDocument>("Branch", branchSchema);
