import { Schema, model, Document } from "mongoose";
import { ShippingStatus, PackEntity, ProductEntity } from "../../types";

export const packSchema = new Schema({
  originBranchId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Branch",
  },
  destinationBranchId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Branch",
  },
  originCustomerType: {
    type: String,
    required: true,
    enum: ["Company", "Client"],
  },
  originCustomer: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: "originCustomerType",
  },
  destinationCustomerType: {
    type: String,
    required: true,
    enum: ["Company", "Client"],
  },
  destinationCustomer: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: "destinationCustomerType",
  },
  description: {
    type: String,
  },
  products: {
    type: [{ type: Schema.Types.ObjectId, required: true }],
    required: true,
    validate: {
      validator: (products: ProductEntity[]) => products.length > 0,
      message: "One product at least required for a pack",
    },
  },
  packCode: {
    type: String,
    required: true,
    unique: true,
  },
  isCOD: {
    type: String,
    required: true,
  },
  isServicePaid: {
    type: String,
    required: true,
  },
  totalPackPrice: {
    type: Number,
    required: true,
  },
  servicePrice: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  shippingStatus: {
    type: String,
    required: true,
    enum: ShippingStatus,
    default: ShippingStatus.originBranch,
  },
});

packSchema.index({ originBranchId: 1 });
packSchema.index({ destinationBranchId: 1 });

export interface PackDocument extends PackEntity, Document {
  _id: string;
}

export const packModel = model<PackDocument>("Pack", packSchema);
