import mongoose from "mongoose";
import { OCCUPANT_TYPES } from "../../../../../../domain/entities/address.entity";

const Schema = mongoose.Schema;

const addressSchema = Schema({
  cityId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "City",
  },
  area: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  block: String,
  floorNumber: Number,
  apartmentNumber: String,
  landmark: {
    type: String,
    required: true,
  },
  lat: Number,
  lng: Number,
  occupantId: {
    type: Schema.Types.ObjectId,
    refPath: "occupantType",
  },
  occupantType: {
    type: String,
    required: true,
    enum: Object.values(OCCUPANT_TYPES),
  },
});

let AddressModel = mongoose.model("Address", addressSchema);

export default AddressModel;
