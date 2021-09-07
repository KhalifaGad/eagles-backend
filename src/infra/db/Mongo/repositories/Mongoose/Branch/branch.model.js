import mongoose from "mongoose";

const Schema = mongoose.Schema;

const branchSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  commercialNumber: {
    type: String,
    required: true,
    unique: true,
  },
  taxCardNumber: {
    type: String,
    required: true,
  },
  address: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Address",
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "BranchOwner",
  },
  employees: {
    type: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Employee",
      },
    ],
    default: [],
  },
  telephone: {
    type: String,
    required: true,
  },
});

const BranchModel = mongoose.model("Branch", branchSchema);

export default BranchModel;
