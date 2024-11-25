import { model, Schema } from "mongoose";
import { ClientInterface } from "$types";
import { Schemas } from "../constants/index.js";
import { addressSchema } from "./shared.schema.js";

const clientSchema = new Schema<ClientInterface>(
  {
    name: { type: String, required: true },
    birthdate: { type: Date },
    address: { type: addressSchema, required: true },
    email: {
      type: String,
      index: {
        unique: true,
        partialFilterExpression: { email: { $exists: true, $ne: null } },
      },
      sparse: true, // This ensures that the unique constraint ignores nulls
    },
    mobile: { type: String, required: true, unique: true },
    defaultNearestAgency: { type: Schema.Types.ObjectId, ref: Schemas.agency },
    secondMobile: {
      type: String,
      index: {
        unique: true,
        partialFilterExpression: {
          secondMobile: { $type: "string" },
        },
      },
    },
  },
  { timestamps: true, versionKey: false }
);

export const ClientModel = model<ClientInterface>(Schemas.client, clientSchema);
