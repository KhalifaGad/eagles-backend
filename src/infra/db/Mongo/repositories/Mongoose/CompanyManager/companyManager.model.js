import mongoose from "mongoose";

const Schema = mongoose.Schema;

const companyManagerSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  departmentName: String,
  mobile: String,
  companyId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Company",
  },
});

const CompanyManagerModel = mongoose.model(
  "CompanyManager",
  companyManagerSchema
);

export default CompanyManagerModel;
