import { model, Schema } from "mongoose";
import { EmployeeInterface } from "$types";
import { Schemas } from "../constants/index.js";
import { addressSchema } from "./shared.schema.js";

const employeeSchema = new Schema<EmployeeInterface>(
  {
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    email: String,
    birthdate: Date,
    position: { type: String, required: true },
    nationalId: { type: String, required: true },
    qualification: { type: String, required: true },
    socialStatus: { type: String, required: true },
    salary: { type: Number, required: true },
    address: addressSchema,
    isAdmin: { type: Boolean, default: false },
    isCustomerService: { type: Boolean, default: false },
    isAgencyAdmin: { type: Boolean, default: false },
    agency: { type: Schema.Types.ObjectId, ref: Schemas.agency },
    hub: { type: Schema.Types.ObjectId, ref: Schemas.hub },
  },
  { timestamps: true, versionKey: "__v" }
);

export const EmployeeModel = model<EmployeeInterface>(Schemas.employee, employeeSchema);
