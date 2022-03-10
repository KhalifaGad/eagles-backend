import { Schema, model, Document } from "mongoose";
import { BranchInterface } from "../../types";
import { addressSchema } from "./shared.schema";

export const branchSchema = new Schema(
  {
    telephone: { type: String, required: true },
    address: { type: addressSchema, required: true },
    mangers: {
      type: [
        {
          name: { type: String, required: true },
          mobile: { type: String, required: true },
          department: { type: String, required: true },
        },
      ],
      required: true,
    },
    organizationId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "organizations",
    },
  },
  { timestamps: true }
).index({ organizationId: 1 });

export interface BranchDocument extends BranchInterface, Document {
  _id: string;
}

export const branchModel = model<BranchDocument>("branches", branchSchema);
