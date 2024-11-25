import { DeliveryReceiptInterface, DeliveryReceiptPartTypeEnum, DeliveryReceiptTypeEnum } from "$types";
import { model, Schema } from "mongoose";
import { Schemas } from "../constants/index.js";

const deliveryReceiptSchema = new Schema<DeliveryReceiptInterface>(
  {
    reference: { type: String, required: true },
    recipient: { type: Schema.Types.ObjectId, ref: Schemas.employee },
    recipientHub: { type: Schema.Types.ObjectId, ref: Schemas.hub },
    recipientAgency: { type: Schema.Types.ObjectId, ref: Schemas.agency },
    recipientRide: { type: Schema.Types.ObjectId, ref: Schemas.ride },
    recipientType: { type: String, enum: DeliveryReceiptPartTypeEnum, required: true },
    originator: { type: Schema.Types.ObjectId, ref: Schemas.employee, required: true },
    originatorHub: { type: Schema.Types.ObjectId, ref: Schemas.hub },
    originatorAgency: { type: Schema.Types.ObjectId, ref: Schemas.agency },
    originatorRide: { type: Schema.Types.ObjectId, ref: Schemas.ride },
    originatorType: { type: String, enum: DeliveryReceiptPartTypeEnum, required: true },
    shipments: [{ type: Schema.Types.ObjectId, ref: Schemas.shipment, required: true }],
    type: { type: String, enum: DeliveryReceiptTypeEnum, required: true },
    isRecipientConfirmed: { type: Boolean, required: true, default: false },
    rideCode: { type: String },
  },
  { timestamps: true, versionKey: false }
);

export const DeliveryReceiptModel = model<DeliveryReceiptInterface>(Schemas.deliveryReceipt, deliveryReceiptSchema);
