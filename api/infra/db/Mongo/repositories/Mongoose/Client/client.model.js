import mongoose from "mongoose";

const Schema = mongoose.Schema;

const clientSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  addresses: {
    type: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Address",
      },
    ],
    required: true,
    default: [],
  },
});

const ClientModel = mongoose.model("Client", clientSchema);

export default ClientModel;
