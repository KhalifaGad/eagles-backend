import { Schema, model, Document } from "mongoose";
import { ProductEntity } from "../../types";

export const productSchema = new Schema({
  nameEn: {
    type: String,
    required: true,
  },
  nameAr: {
    type: String,
    required: true,
  },
  descriptionEn: {
    type: String,
    required: true,
  },
  descriptionAr: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  companyId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Company",
  },
  branchId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Branch",
  },
});

productSchema.index({ name: 1 });

export interface ProductDocument extends ProductEntity, Document {
  _id: string;
}

export const productModel = model<ProductDocument>("Product", productSchema);
