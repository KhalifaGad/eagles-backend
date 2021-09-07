import mongoose from "mongoose";

const Schema = mongoose.Schema;

const employeeSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  idNumber: {
    type: String,
    required: true,
  },
  loginPermission: {
    type: Boolean,
    default: false,
    required: true,
  },
  branchId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Branch",
  },
  addressId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Address",
  },
  employeeRoleId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "EmployeeRole",
  },
});

const EmployeeModel = mongoose.model("Employee", employeeSchema);

export default EmployeeModel;
