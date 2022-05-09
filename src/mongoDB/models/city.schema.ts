import { Schema, model } from "mongoose";
import { CityInterface } from "../../types";
import { Schemas } from "../../../constants";

const citySchema = new Schema<CityInterface>(
  {
    arabicName: { type: String, required: true, unique: true },
    englishName: { type: String, required: true, unique: true },
  },
  { timestamps: false, versionKey: false }
).index({ arabicName: 1, englishName: 1 });

export const CityModel = model<CityInterface>(Schemas.city, citySchema);
