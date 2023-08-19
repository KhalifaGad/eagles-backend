import { model, Schema } from "mongoose";
import { HubInterface } from "../../types";
import { Schemas } from "../constants";
import { addressSchema } from "./shared.schema";

const hubSchema = new Schema<HubInterface>(
  {
    name: { type: String, required: true, unique: true },
    address: { type: addressSchema, required: true },
  },
  { timestamps: true, versionKey: false }
);

export const HubModel = model<HubInterface>(Schemas.hub, hubSchema);
