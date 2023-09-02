import { model, Schema } from "mongoose";
import {
  ShipmentConsigneeEnum,
  ShipmentConsignorEnum,
  ShipmentDestinationEnum,
  ShipmentEventNamesEnum,
  ShipmentInterface, ShipmentStatuses,
} from "../../types";
import { Schemas } from "../constants";

const shipmentProductSchemaObject = {
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true, default: 0 },
};

const shipmentSchema = new Schema<ShipmentInterface>(
  {
    code: { type: String, required: true, unique: true },
    referenceNumber: { type: String, required: true },
    consigneeType: { type: String, enum: ShipmentConsigneeEnum, required: true },
    consignee: { type: Schema.Types.ObjectId, refPath: "consigneeType" },
    consignorType: { type: String, enum: ShipmentConsignorEnum, required: true },
    consignor: { type: Schema.Types.ObjectId, refPath: "consignorType" },
    shippingFees: { type: Number, required: true, default: 20 }, // TODO: check the default value
    collectCashFees: { type: Number, required: true, default: 0 },
    shipmentPrice: { type: Number, required: true, default: 0 },
    originAgency: { type: Schema.Types.ObjectId, ref: Schemas.agency, required: true },
    originHotspot: { type: Schema.Types.ObjectId, ref: Schemas.hub, required: true },
    destinationAgency: { type: Schema.Types.ObjectId, ref: Schemas.agency, required: true },
    destinationHotspot: { type: Schema.Types.ObjectId, ref: Schemas.hub, required: true },
    hub: { type: Schema.Types.ObjectId, ref: Schemas.hub, required: true },
    failedAttemptsCount: { type: Number, required: true, default: 0 },
    isReturning: { type: Boolean, required: true, default: false },
    status: { type: String, enum: ShipmentStatuses, required: true },
    searchables: {
      consignorName: { type: String, index: 1 },
      consigneeName: { type: String, index: 1 },
      consignorMobile: { type: String, index: 1 },
      consigneeMobile: { type: String, index: 1 },
      originAgencyName: { type: String, index: 1 },
      destinationAgencyName: { type: String, index: 1 },
    },
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
    events: {
      type: [
        {
          name: { type: String, required: true, enum: ShipmentEventNamesEnum },
          date: { type: Date, required: true },
          employee: { type: Schema.Types.ObjectId, ref: Schemas.employee },
          hub: { type: Schema.Types.ObjectId, ref: Schemas.hub },
          destinationType: { type: String, enum: ShipmentDestinationEnum },
          products: [shipmentProductSchemaObject],
        },
      ],
      minlength: 1,
    },
  },
  { timestamps: true, versionKey: false }
).index({ referenceNumber: 1, originAgency: 1 }, { unique: true });

export const ShipmentModel = model<ShipmentInterface>(Schemas.shipment, shipmentSchema);
