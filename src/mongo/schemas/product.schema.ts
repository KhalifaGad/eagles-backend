import { Schema, model, Document } from "mongoose";
import { ProductInterface } from "../../types";

export const productSchema = new Schema({
  name: {
    arabic: { type: String, required: true, unique: true },
    english: { type: String, required: true, unique: true },
  },
  description: {
    arabic: { type: String, required: true, unique: true },
    english: { type: String, required: true, unique: true },
  },
  price: { type: Number, required: true },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  width: { type: Number, required: true },
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
})
  .index({ arabicName: 1 })
  .index({ englishName: 1 })
  .index({ organizationId: 1 })
  .index({ branchId: 1 });

export interface ProductDocument extends ProductInterface, Document {
  _id: string;
}

export const productModel = model<ProductDocument>("products", productSchema);
