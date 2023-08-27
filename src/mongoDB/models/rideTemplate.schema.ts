import { model, Schema } from "mongoose";
import { RideTemplateInterface, StepLocationTypeEnum } from "../../types";
import { Schemas } from "../constants";


const rideTemplateSchema = new Schema<RideTemplateInterface>(
  {
    name: { type: String, required: true, unique: true },
    steps: {
      type: [{
        sequence: { type: Number, required: true, min: 1 },
        name: { type: String, required: true },
        cityName: { type: String, required: true },
        area: { type: String },
        street: { type: String },
        landmark: { type: String },
        lat: { type: Number },
        lng: { type: Number },
        stepLocationType: { type: String, enum: StepLocationTypeEnum, required: true },
      }],
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export const RideTemplateModel = model<RideTemplateInterface>(Schemas.rideTemplate, rideTemplateSchema);
