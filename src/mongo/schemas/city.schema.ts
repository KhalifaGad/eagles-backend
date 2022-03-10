import { Schema, model, Document } from "mongoose";
import { CityInterface } from "../../types";

export const citySchema = new Schema({
  name: { type: String, required: true, unique: true },
});

citySchema.index({ name: 1 });

export interface CityDocument extends CityInterface, Document {
  _id: string;
}

export const cityModel = model<CityDocument>("cities", citySchema);
