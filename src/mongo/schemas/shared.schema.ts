import { Schema } from "mongoose";

export const addressSchema = new Schema({
  cityId: { type: Schema.Types.ObjectId, required: true, ref: "cities" },
  area: { type: String, required: true },
  street: { type: String, required: true },
  landmark: { type: String },
  block: { type: String },
  floorNumber: { type: Number },
  apartmentNumber: { type: String },
  lat: { type: Number },
  lng: { type: Number },
});
