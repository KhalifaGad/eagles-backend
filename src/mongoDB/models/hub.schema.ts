import { Schema, model } from "mongoose";
import { addressSchema } from "./shared";
import { HubInterface } from "../../types";
import { Schemas } from "../../../constants";

const hubSchema = new Schema<HubInterface>(
  {
    name: { type: String, required: true, unique: true },
    address: { type: addressSchema },
  },
  { timestamps: true }
);

export const HubModel = model<HubInterface>(Schemas.hub, hubSchema);
