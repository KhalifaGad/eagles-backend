import { RideTemplateInterface, StepLocationTypeEnum } from "$types";
import { model, Schema } from "mongoose";
import { Schemas } from "../constants/index.js";

const rideTemplateSchema = new Schema<RideTemplateInterface>(
  {
    name: { type: String, required: true, unique: true },
    steps: {
      type: [
        {
          sequence: { type: Number, required: true, min: 1 },
          stepLocationType: { type: String, enum: StepLocationTypeEnum, required: true },
          stepLocationEntity: { type: Schema.Types.ObjectId, refPath: "steps.stepLocationType", required: true },
        },
      ],
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export const RideTemplateModel = model<RideTemplateInterface>(Schemas.rideTemplate, rideTemplateSchema);
