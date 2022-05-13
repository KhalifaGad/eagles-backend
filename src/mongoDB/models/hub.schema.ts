import { Schema, model } from "mongoose";
import { addressSchema } from "./shared.schema";
import { HubInterface } from "../../types";
import { Schemas } from "../../../constants";

const hubSchema = new Schema<HubInterface>(
  {
    name: { type: String, required: true, unique: true },
    address: { type: addressSchema, required: true },
  },
  { timestamps: true, versionKey: false }
);

export const HubModel = model<HubInterface>(Schemas.hub, hubSchema);
