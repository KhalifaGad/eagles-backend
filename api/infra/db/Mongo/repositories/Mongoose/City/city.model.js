import mongoose from "mongoose";

const Schema = mongoose.Schema;

const citySchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const CityModel = mongoose.model("City", citySchema);

export default CityModel;
