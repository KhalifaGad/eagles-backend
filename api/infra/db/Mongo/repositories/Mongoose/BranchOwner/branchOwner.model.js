import mongoose from "mongoose";

const Schema = mongoose.Schema;

const branchOwnerSchema = Schema({
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
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Address",
  },
  branches: {
    type: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Branch",
      },
    ],
    default: [],
  },
});

const BranchOwnerModel = mongoose.model("BranchOwner", branchOwnerSchema);

export default BranchOwnerModel;
