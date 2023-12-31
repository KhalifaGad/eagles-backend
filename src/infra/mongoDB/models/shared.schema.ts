import { AddressInterface } from "$types";
import { Schema } from "mongoose";
import { Schemas } from "../constants/index.js";

export const addressSchema = new Schema<AddressInterface>(
  {
    city: { type: Schema.Types.ObjectId, ref: Schemas.city, required: true },
    area: { type: String, required: true },
    street: { type: String, required: true },
    name: { type: String },
    floorNumber: { type: String },
    landmark: { type: String },
    lat: { type: Number },
    lng: { type: Number },
    block: { type: String },
    apartmentNumber: { type: String },
  },
  { timestamps: false, versionKey: false, strict: false, _id: false }
);
