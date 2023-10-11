import { RideInterface, StepLocationTypeEnum } from "$types";
import { model, Schema } from "mongoose";
import { Schemas } from "../constants/index.js";

const rideSchema = new Schema<RideInterface>(
  {
    code: { type: String, required: true, unique: true },
    employees: {
      type: [{ type: Schema.Types.ObjectId, required: true, ref: Schemas.employee }],
      min: 2,
      required: true,
    },
    shipments: [{ type: Schema.Types.ObjectId, required: true, ref: Schemas.shipment }],
    steps: {
      type: [
        {
          sequence: { type: Number, required: true, min: 1 },
          stepLocationType: { type: String, enum: StepLocationTypeEnum, required: true },
          stepLocationEntity: { type: Schema.Types.ObjectId, refPath: "steps.stepLocationType", required: true },
        },
      ],
      required: true,
      min: 3,
    },
    startDate: { type: Date },
    endDate: { type: Date },
  },
  { timestamps: true, versionKey: false }
).index({ code: 1 });

export const RideModel = model<RideInterface>(Schemas.ride, rideSchema);
