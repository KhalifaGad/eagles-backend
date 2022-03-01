import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = Schema({
  nameEn: {
    type: String,
    required: true,
  },
  nameAr: {
    type: String,
    required: true,
  },
  descriptionEn: String,
  descriptionAr: String,
  price: Number,
  weight: Number,
  height: Number,
  width: Number,
  companyId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Company",
  },
  byBranchId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Branch",
  },
});

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
