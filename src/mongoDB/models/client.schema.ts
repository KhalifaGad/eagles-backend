import {model, Schema} from "mongoose";
import {ClientInterface} from "../../types";
import {Schemas} from "../constants";
import {addressSchema} from "./shared.schema";

const clientSchema = new Schema<ClientInterface>(
    {
        firstName: {type: String, required: true},
        familyName: {type: String, required: true},
        birthdate: {type: Date},
        address: {type: addressSchema, required: true},
        email: {type: String, unique: true},
        mobile: {type: String, required: true, unique: true},
        secondMobile: {
            type: String,
            index: {
                unique: true,
                partialFilterExpression: {
                    secondMobile: {$type: "string"},
                },
            },
        },
    },
    {timestamps: true, versionKey: false}
);

export const ClientModel = model<ClientInterface>(Schemas.client, clientSchema);
