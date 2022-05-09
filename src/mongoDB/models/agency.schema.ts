import { Schema, model } from "mongoose";
import { addressSchema } from "./shared";
import { AgencyInterface } from "../../types";
import { Schemas } from "../../../constants";

const agencySchema = new Schema<AgencyInterface>(
  {
    name: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    telephone: { type: String, required: true, unique: true },
    address: { type: addressSchema, required: true },
    inCityPackagePercentage: { type: Number, required: true },
    receivedPackagePercentage: { type: Number, required: true },
    sentPackagePercentage: { type: Number, required: true },
    shareBusPercentage: { type: Number, required: true },
  },
  { timestamps: true, versionKey: false }
);

export const AgencyModel = model<AgencyInterface>(Schemas.agency, agencySchema);
