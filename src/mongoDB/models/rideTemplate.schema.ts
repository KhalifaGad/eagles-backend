import { model, Schema } from "mongoose";
import { RideStepInterface, RideTemplateInterface, StepLocationTypeEnum } from "../../types";
import { Schemas } from "../constants";

const stepSchema = new Schema({
  sequence: { type: Number, required: true, min: 1 },
  stepLocationType: { type: String, enum: StepLocationTypeEnum, required: true },
  stepLocationEntity: {type: Schema.Types.ObjectId, refPath: "stepLocationType", required: true },
});

const rideTemplateSchema = new Schema<RideTemplateInterface>(
  {
    name: { type: String, required: true, unique: true },
    steps: {
      type: [stepSchema],
      required: true,
      validate: {
        validator: function (value: RideStepInterface[]) {
          return value.length >= 3;
        },
        message: "Steps array must contain at least 3 items.",
      },
    },
  },
  { timestamps: true, versionKey: false }
);

export const RideTemplateModel = model<RideTemplateInterface>(Schemas.rideTemplate, rideTemplateSchema);
