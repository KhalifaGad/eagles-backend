import { Schema, model, Document } from "mongoose";
import { addressSchema } from "./shared.schema";
import { packageSchema } from "./order.schema";
import { RideInterface } from "../../types";

export const rideSchema = new Schema(
  {
    origin: { type: addressSchema, required: true },
    destination: { type: addressSchema, required: true },
    driverId: { type: Schema.Types.ObjectId, required: true, ref: "drivers" },
    vehicleId: { type: Schema.Types.ObjectId, required: true, ref: "vehicles" },
    packages: { type: [packageSchema], required: true },
    isCompleted: { type: Boolean, default: false },
  },
  { timestamps: true }
)
  .index({ origin: 1 })
  .index({ destination: 1 });

export interface RideDocument extends RideInterface, Document {
  _id: string;
}

export const rideModel = model<RideDocument>("rides", rideSchema);
