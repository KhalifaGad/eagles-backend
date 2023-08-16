import { model, Schema } from "mongoose";
import { CompaniesEnum, CompanyInterface, RepaymentEnum } from "../../types";
import { Schemas } from "../constants";
import { addressSchema } from "./shared.schema";

const companyURLSchema = {
	value: { type: String, required: true },
	description: { type: String },
};

const repaymentConfigSchema = {
	default: {
		type: String,
		enum: RepaymentEnum,
		required: true,
	},
	walletNumber: { type: String },
	accountNumber: { type: String },
	bank: { type: String },
	branch: { type: String },
	swftCode: { type: String },
	iban: { type: String },
};

const companySchema = new Schema<CompanyInterface>(
	{
		name: { type: String, required: true, unique: true },
		commercialNo: { type: String },
		taxNo: { type: String },
		businessType: { type: String, required: true },
		urls: [companyURLSchema],
		repaymentConfig: { type: repaymentConfigSchema, required: true },
		address: { type: addressSchema, required: true },
		companyType: {
			type: String,
			enum: CompaniesEnum,
			required: true,
			default: CompaniesEnum.Traditional,
		},
	},
	{ timestamps: true, versionKey: false }
);

export const CompanyModel = model<CompanyInterface>(Schemas.company, companySchema);
