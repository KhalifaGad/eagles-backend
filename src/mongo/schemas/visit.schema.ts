import { Schema, model, Document } from "mongoose";
import { VisitEntity } from "../../types";

export const visitSchema = new Schema({
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
  rejectionReason: {
    type: String,
  },
});

visitSchema.index({ companyId: 1 });

export interface VisitDocument extends VisitEntity, Document {
  _id: string;
}

export const visitModel = model<VisitDocument>("Visit", visitSchema);
