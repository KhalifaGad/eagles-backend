import { Schema, model, Document } from "mongoose";
import { VehicleInterface } from "../../types";

export const vehicleSchema = new Schema({
  plateNumber: { type: String, required: true, unique: true },
}).index({ plateNumber: 1 });

export interface VehicleDocument extends VehicleInterface, Document {
  _id: string;
}

export const vehicleModel = model<VehicleDocument>("vehicles", vehicleSchema);
