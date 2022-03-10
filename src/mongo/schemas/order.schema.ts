import { Schema, model, Document } from "mongoose";
import { PackInterface, ShippingStatusEnum } from "../../types";
import { productSchema } from "./product.schema";
import { addressSchema } from "./shared.schema";

export const ordersSchema = new Schema({
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
        address: { type: addressSchema, required: true },
        shippingStatus: {
          type: String,
          required: true,
          enum: ShippingStatusEnum,
          default: ShippingStatusEnum.originBranch,
        },
        products: {
          type: [
            {
              product: { type: productSchema, unique: true, required: true },
              quality: { type: Number, required: true },
            },
          ],
          required: true,
        },
      },
    ],
    required: true,
  },
});

ordersSchema.index({ originBranchId: 1 });
ordersSchema.index({ destinationBranchId: 1 });

export interface OrderDocument extends PackInterface, Document {
  _id: string;
}

export const orderModel = model<OrderDocument>("orders", ordersSchema);
