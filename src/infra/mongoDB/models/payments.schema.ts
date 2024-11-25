import { model, Schema } from "mongoose";
import { HubInterface } from "$types";
import { Schemas } from "../constants/index.js";
import { addressSchema } from "./shared.schema.js";

const hubSchema = new Schema<HubInterface>(
  {
    name: { type: String, required: true, unique: true },
    address: { type: addressSchema, required: true },
    isHotspot: { type: Boolean, required: true, default: false },
    parentHub: {
      type: Schema.Types.ObjectId,
      ref: Schemas.hub,
      required: () => {
        if (this && Object.hasOwn(this ?? {}, "isHotspot")) {
          return (this as any)?.isHotspot;
        }
        return false;
      },
    },
  },
  { timestamps: true, versionKey: false }
);

export const HubModel = model<HubInterface>(Schemas.hub, hubSchema);
