import { Schema, model, Document } from "mongoose";
import { EmployeeEntity } from "../../types";
import { addressSchema } from "./shared.schema";

export const employeeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  idNumber: {
    type: String,
    required: true,
  },
  loginPermission: {
    type: Boolean,
    default: false,
  },
  branchId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Branch",
  },
  addressId: {
    type: addressSchema,
    required: true,
  },
  employeeRoleId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "EmployeeRole",
  },
});

employeeSchema.index({ name: 1 });

export interface EmployeeDocument extends EmployeeEntity, Document {
  _id: string;
}
export const employeeModel = model<EmployeeDocument>(
  "Employee",
  employeeSchema
);
