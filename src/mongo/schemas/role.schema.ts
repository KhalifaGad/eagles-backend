import { Schema, model, Document } from "mongoose";
import { RoleInterface } from "../../types";

export const rolesSchema = new Schema(
  { name: { type: String, required: true, unique: true } },
  { timestamps: true }
).index({ name: 1 });

export interface RoleDocument extends RoleInterface, Document {
  _id: string;
}

export const roleModel = model<RoleDocument>("roles", rolesSchema);
