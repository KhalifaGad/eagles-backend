import { Schema, model } from "mongoose";
import { RideInterface } from "../../types";
import { Schemas } from "../../../constants";

const rideSchema = new Schema<RideInterface>(
  {
    code: { type: String, required: true, unique: true },
    employees: {
      type: [{ type: Schema.Types.ObjectId, required: true, ref: Schemas.employee }],
      min: 2,
      required: true,
    },
    vehicle: { type: Schema.Types.ObjectId, required: true, ref: Schemas.vehicle },
    shipments: [{ type: Schema.Types.ObjectId, required: true, ref: Schemas.shipment }],
    locations: {
      type: [
        {
          order: { type: Number, required: true },
          area: { type: String, required: true },
          street: { type: String, required: true },
          city: { type: Schema.Types.ObjectId, required: true, ref: Schemas.city },
          lat: { type: Number },
          lng: { type: Number },
          meterReading: { type: Number },
          name: { type: String },
          arrivalDate: { type: Date },
          departureDate: { type: Date },
        },
      ],
      required: true,
      min: 3,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
  },
  { timestamps: true }
).index({ code: 1 });

export const RideModel = model<RideInterface>(Schemas.ride, rideSchema);
