import { Schema, model, Document } from "mongoose";
import { RoleInterface } from "../../types";

export const rolesSchema = new Schema({
  name: { type: String, required: true, unique: true },
}).index({ name: 1 });

export interface RolesDocument extends RoleInterface, Document {
  _id: string;
}

export const rolesModel = model<RolesDocument>("roles", rolesSchema);
