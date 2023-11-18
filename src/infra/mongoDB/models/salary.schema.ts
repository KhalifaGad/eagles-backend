import { SalaryInterface } from "$types";
import { model, Schema } from "mongoose";
import { Schemas } from "../constants/index.js";

const salarySchema = new Schema<SalaryInterface>(
  {
    employee: { type: Schema.Types.ObjectId, required: true, ref: Schemas.employee },
    agency: { type: Schema.Types.ObjectId, required: true, ref: Schemas.agency },
    baseSalary: { type: Number, required: true },
    deduction: { type: Number, default: 0 },
    reward: { type: Number, default: 0 },
    finalSalary: {
      type: Number,
      default: function () {
        return this.baseSalary + (this.reward ?? 0) - (this.deduction ?? 0);
      },
    },
    deductionReason: { type: String },
    rewardReason: { type: String },
    billed: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

export const SalaryModel = model<SalaryInterface>(Schemas.salary, salarySchema);
