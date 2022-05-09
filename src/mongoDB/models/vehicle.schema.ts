import { Schema, model } from "mongoose";
import { VehicleInterface } from "../../types";
import { Schemas } from "../../../constants";

const vehicleSchema = new Schema<VehicleInterface>(
  {
    code: { type: String, required: true, unique: true },
    chassisNo: { type: String, required: true, unique: true },
    color: { type: String, required: true },
    model: { type: String, required: true },
    tonnage: { type: String, required: true },
    type: { type: String, required: true },
    condition: { type: String, required: true },
    license: {
      type: {
        id: { type: String, required: true, unique: true },
        startDate: { type: Date, required: true },
        renewalDate: { type: Date, required: true },
      },
      required: true,
    },
    insurance: {
      type: {
        startDate: { type: Date, required: true },
        renewalDate: { type: Date, required: true },
      },
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export const VehicleModel = model<VehicleInterface>(Schemas.vehicle, vehicleSchema);
