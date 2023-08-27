import { model, Schema } from "mongoose";
import { RideTemplateInterface, StepLocationTypeEnum } from "../../types";
import { Schemas } from "../constants";

const rideTemplateSchema = new Schema<RideTemplateInterface>(
  {
    name: { type: String, required: true, unique: true },
    steps: {
      type: [
        {
          sequence: { type: Number, required: true, min: 1 },
          stepLocationType: { type: String, enum: StepLocationTypeEnum, required: true },
          stepLocationEntity: { type: Schema.Types.ObjectId, refPath: "stepLocationType", required: true },
        },
      ],
      required: true,
      min: 3,
    },
  },
  { timestamps: true, versionKey: false }
);

export const RideTemplateModel = model<RideTemplateInterface>(Schemas.rideTemplate, rideTemplateSchema);
