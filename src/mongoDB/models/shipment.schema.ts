import { Schema, model } from "mongoose";
import {
  ShipmentInterface,
  ShipmentConsigneeEnum,
  ShipmentConsignorEnum,
  ShipmentDestinationEnum,
  ShipmentEventNamesEnum,
} from "../../types";
import { Schemas } from "../../../constants";

const shipmentProductSchemaObject = {
  name: { type: String, required: true },
  description: { type: String },
  price: Number,
};

const shipmentSchema = new Schema<ShipmentInterface>(
  {
    code: { type: String, required: true, unique: true },
    consigneeType: { type: String, enum: ShipmentConsigneeEnum, required: true },
    consignee: { type: Schema.Types.ObjectId, refPath: "consigneeType" },
    consignorType: { type: String, enum: ShipmentConsignorEnum, required: true },
    consignor: { type: Schema.Types.ObjectId, refPath: "consignorType" },
    shouldCollectCash: { type: Boolean, required: true },
    shippingFees: { type: Number, required: true },
    collectCashFees: { type: Number, required: true },
    originAgency: { type: Schema.Types.ObjectId, ref: Schemas.agency, required: true },
    destinationAgency: { type: Schema.Types.ObjectId, ref: Schemas.agency, required: true },
    isInCity: {
      type: Boolean,
      default: false,
    },
    notes: [String],
    products: {
      type: [shipmentProductSchemaObject],
      min: 1,
    },
    returns: [shipmentProductSchemaObject],
    events: [
      {
        name: { type: String, required: true, enum: ShipmentEventNamesEnum },
        date: { type: Date, required: true },
        employee: { type: Schema.Types.ObjectId, ref: Schemas.employee },
        hub: { type: Schema.Types.ObjectId, ref: Schemas.hub },
        destinationType: { type: String, enum: ShipmentDestinationEnum },
        products: [shipmentProductSchemaObject],
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

export const ShipmentModel = model<ShipmentInterface>(Schemas.shipment, shipmentSchema);
