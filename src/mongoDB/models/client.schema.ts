import { Schema, model } from "mongoose";
import { addressSchema } from "./shared.schema";
import { ClientInterface } from "../../types";
import { Schemas } from "../../../constants";

const clientSchema = new Schema<ClientInterface>(
  {
    firstName: { type: String, required: true },
    familyName: { type: String, required: true },
    birthdate: { type: Date, required: true },
    address: { type: addressSchema, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
  },
  { timestamps: true, versionKey: false }
);

export const ClientModel = model<ClientInterface>(Schemas.client, clientSchema);
