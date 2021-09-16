import mongoose from "mongoose";

const Schema = mongoose.Schema;

const companySchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  businessType: {
    type: String,
    required: true,
  },
  address: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Address",
  },
  telephone: {
    type: String,
    required: true,
  },
  managers: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "CompanyManager",
        required: true,
      },
    ],
    default: [],
  },
  ownerName: String,
  ownerMobile: String,
});

const CompanyModel = mongoose.model("Company", companySchema);

export default CompanyModel;
