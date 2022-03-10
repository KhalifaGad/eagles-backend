import { Schema, model, Document } from "mongoose";
import { OrderInterface, ShippingStatusEnum, OrderTypeEnum } from "../../types";
import { addressSchema } from "./shared.schema";

// TODO
export const packageSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, required: true },
    quality: { type: Number, required: true },
  },
  { timestamps: true }
);

export const ordersSchema = new Schema(
  {
    orderType: {
      type: String,
      required: true,
      enum: OrderTypeEnum,
    },
    destination: { type: addressSchema, required: true },
    totalPrice: { type: Number, required: true },
    notes: { type: String },
    fulfillers: {
      type: [
        {
          name: { type: String, required: true },
          organizationId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "organizations",
          },
          branchId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "branches",
          },
          origin: { type: addressSchema, required: true },
          shippingStatus: {
            type: String,
            enum: ShippingStatusEnum,
            default: "origin_branch",
          },
          packages: {
            type: [packageSchema],
            required: true,
          },
        },
      ],
      required: true,
    },
  },
  { timestamps: true }
);

export interface OrderDocument extends OrderInterface, Document {
  _id: string;
}

export const orderModel = model<OrderDocument>("orders", ordersSchema);
