import { Schema } from "mongoose";

export const addressSchema = new Schema({
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
  block: {
    type: String,
  },
  floorNumber: {
    type: Number,
  },
  apartmentNumber: {
    type: String,
  },
  landmark: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
  },
  lng: {
    type: Number,
  },
});

export const branchOwnerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  idNumber: {
    type: String,
    required: true,
  },
  address: {
    type: addressSchema,
    required: true,
  },
});

export const companyManagerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  departmentName: {
    type: String,
  },
  mobile: {
    type: String,
  },
});
