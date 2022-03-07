import { Schema, model, Document } from "mongoose";
import { addressSchema } from "./shared.schema";
import { ClientEntity } from "../../types";

export const clientSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  branchId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Branch",
  },
  addresses: {
    type: [{ type: addressSchema, required: true }],
    required: true,
  },
});

clientSchema.index({ mobile: 1 });

export interface ClientDocument extends ClientEntity, Document {
  _id: string;
}
export const clientModel = model<ClientDocument>("Client", clientSchema);
