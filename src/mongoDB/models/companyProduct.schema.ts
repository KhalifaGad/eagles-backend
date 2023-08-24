import { model, Schema } from "mongoose";
import { CompanyProductInterface } from "../../types";
import { Schemas } from "../constants";
import { customAlphabet } from "nanoid";

const AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const NumericString = "0123456789";

const refCharsGenerator = customAlphabet(AlphaNumericString, 5);
const refNumbersGenerator = customAlphabet(NumericString, 5);

export const getReference = () => `${refCharsGenerator()}${refNumbersGenerator()}`;

const companyProductSchema = new Schema<CompanyProductInterface>(
	{
		name: { type: String, required: true, unique: true },
		description: String,
		price: { type: Number },
		reference: { type: String, required: true, default: getReference },
		company: { type: Schema.Types.ObjectId, ref: Schemas.company }
	},
	{ timestamps: true, versionKey: true }
);

export const CompanyProductModel = model<CompanyProductInterface>(Schemas.companyProduct, companyProductSchema);
