import { model, Schema } from "mongoose";
import { DeliveryReceiptInterface } from "$types";
import { Schemas } from "../constants/index.js";

const deliveryReceiptSchema = new Schema<DeliveryReceiptInterface>(
  {
    reference: { type: String, required: true },
    recipient: { type: Schema.Types.ObjectId, ref: Schemas.employee },
    recipientHub: { type: Schema.Types.ObjectId, ref: Schemas.hub },
    recipientAgency: { type: Schema.Types.ObjectId, ref: Schemas.agency },
    originator: { type: Schema.Types.ObjectId, ref: Schemas.employee, required: true },
    originatorHub: { type: Schema.Types.ObjectId, ref: Schemas.hub },
    originatorAgency: { type: Schema.Types.ObjectId, ref: Schemas.agency },
    attributedTo: { type: String, required: true },
    shipments: [{ type: Schema.Types.ObjectId, ref: Schemas.shipment, required: true }],
    type: { type: String, required: true },
    isRecipientConfirmed: { type: Boolean, required: true, default: false },
  },
  { timestamps: true, versionKey: false }
);

export const DeliveryReceiptModel = model<DeliveryReceiptInterface>(Schemas.deliveryReceipt, deliveryReceiptSchema);
