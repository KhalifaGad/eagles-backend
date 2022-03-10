import { Schema, model, Document } from "mongoose";
import { addressSchema } from "./shared.schema";
import { UserInterface } from "../../types";

export const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },
  address: { type: { type: addressSchema, required: true }, required: true },
  branchId: { type: Schema.Types.ObjectId, ref: "branches" },
  roleId: { type: Schema.Types.ObjectId, ref: "roles" },
  isAdmin: { type: Boolean, default: false },
}).index({ mobile: 1 });

export interface UserDocument extends UserInterface, Document {
  _id: string;
}
export const userModel = model<UserDocument>("users", userSchema);
