import { Schema, model, Document } from "mongoose";
import { EmployeeRoleEntity } from "../../types";

export const employeeRoleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

employeeRoleSchema.index({ name: 1 });

export interface EmployeeRoleDocument extends EmployeeRoleEntity, Document {
  _id: string;
}

export const employeeRoleModel = model<EmployeeRoleDocument>(
  "EmployeeRole",
  employeeRoleSchema
);
