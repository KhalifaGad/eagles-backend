import mongoose from "mongoose";
import { SHIPPING_STATUSES } from "domain/entities/pack.entity";
const Schema = mongoose.Schema;

const packSchema = Schema({
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
  description: String,
  products: {
    type: [{ type: Schema.Types.ObjectId, required: true }],
    required: true,
    validate: {
      validator: (products) => products.length > 0,
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
    enum: SHIPPING_STATUSES,
  },
});

const PackModel = mongoose.model("Pack", packSchema);

export default PackModel;
