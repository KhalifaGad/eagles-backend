import { model, Schema } from "mongoose";
import { AgencyInterface } from "../../types";
import { Schemas } from "../constants";
import { addressSchema } from "./shared.schema";

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

// agencySchema.index({ "address.lat": "2dsphere", "address.lng": "2dsphere" });

export const AgencyModel = model<AgencyInterface>(Schemas.agency, agencySchema);

/*
 *
 * 1. bakat betet8yr esbo3yen => bet7aded kam tard
 * 2. kol agency benshof me7a22a el target wala la kol you el sob7 => hatenzl fi table agency alerts
 * 3. law fi agency leha overtarget byt4alha ka rased or points
 *
 * */
