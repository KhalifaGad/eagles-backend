import { Schema } from "mongoose";
import { Schemas } from "../../../constants";

export const addressSchema = {
  city: { type: Schema.Types.ObjectId, ref: Schemas.city },
  area: { type: String, required: true },
  street: { type: String, required: true },
  name: { type: String },
  floorNumber: { type: String },
  landmark: { type: String },
  lat: { type: Number },
  lng: { type: Number },
  block: { type: String },
  apartmentNumber: { type: String },
};
