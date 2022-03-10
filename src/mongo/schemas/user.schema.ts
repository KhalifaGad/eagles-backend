import { Schema, model, Document } from "mongoose";
import { addressSchema } from "./shared.schema";
import { UserInterface } from "../../types";

// TODO
export const permissionsSchema = new Schema(
  {
    access: { type: Boolean, default: false },
    edit: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    address: { type: addressSchema, required: true },
    branchId: { type: Schema.Types.ObjectId, ref: "branches" },
    roleId: { type: Schema.Types.ObjectId, ref: "roles" },
    permissions: { type: permissionsSchema },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
).index({ mobile: 1 });

export interface UserDocument extends UserInterface, Document {
  _id: string;
}
export const userModel = model<UserDocument>("users", userSchema);
