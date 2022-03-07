import { Schema, model, Document } from "mongoose";
import { CityEntity } from "../../types";

export const citySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

citySchema.index({ name: 1 });

export interface CityDocument extends CityEntity, Document {
  _id: string;
}

export const cityModel = model<CityDocument>("City", citySchema);
