import { model, Schema } from "mongoose";
import { EmployeeRatingInterface } from "../../types";
import { Schemas } from "../constants";

const numericRating = { type: Number, required: true, min: 0, max: 100 };

const employeeRatingSchema = new Schema<EmployeeRatingInterface>(
	{
		employee: { type: Schema.Types.ObjectId, ref: Schemas.employee, required: true },
		agency: { type: Schema.Types.ObjectId, ref: Schemas.agency, required: true },
		appearance: numericRating,
		hygiene: numericRating,
		individualTasks: numericRating,
		ordersExecution: numericRating,
		planPunctuality: numericRating,
		teamPlaying: numericRating,
		timePunctuality: numericRating,
		communicationSkills: numericRating,
		complaint: { type: String },
		notes: [String],
		reward: { type: String },
		deduction: { type: String },
	},
	{ timestamps: true, versionKey: false }
);

export const EmployeeRatingModel = model<EmployeeRatingInterface>(Schemas.employeeRating, employeeRatingSchema);
