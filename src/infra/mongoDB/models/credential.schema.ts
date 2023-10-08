import { model, Schema } from "mongoose";
import { AccountEnum, CredentialInterface } from "$types";
import { Schemas } from "../constants/index.js";

const credentialSchema = new Schema<CredentialInterface>(
  {
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    accountType: {
      type: String,
      enum: AccountEnum,
      required: true,
    },
    account: {
      type: Schema.Types.ObjectId,
      refPath: "accountType",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export const CredentialModel = model<CredentialInterface>(Schemas.credential, credentialSchema);
