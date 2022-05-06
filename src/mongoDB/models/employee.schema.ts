import { Schema, model } from "mongoose";
import { addressSchema } from "./shared";
import { EmployeeInterface } from "../../types";
import { Schemas } from "../../../constants";

export const employeeSchema = new Schema<EmployeeInterface>(
  {
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    birthdate: { type: Date, required: true },
    position: { type: String, required: true },
    nationalId: { type: String, required: true },
    qualification: { type: String, required: true },
    socialStatus: { type: String, required: true },
    salary: { type: Number, required: true },
    address: { type: addressSchema },
  },
  { timestamps: true }
);

export const EmployeeModel = model<EmployeeInterface>(Schemas.employee, employeeSchema);
