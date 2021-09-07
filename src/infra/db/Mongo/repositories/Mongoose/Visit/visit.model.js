import mongoose from "mongoose";

const Schema = mongoose.Schema;

const visitSchema = Schema({
  employeeId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Employee",
  },
  companyId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Company",
  },
  packs: {
    type: [{ type: Schema.Types.ObjectId, required: true, ref: "Pack" }],
    required: true,
    default: [],
  },
  rejectionReason: String,
});

const VisitModel = mongoose.model("Visit", visitSchema);

export default VisitModel;
