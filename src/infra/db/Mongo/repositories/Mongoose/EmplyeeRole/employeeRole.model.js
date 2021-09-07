import mongoose from "mongoose";

const Schema = mongoose.Schema;

const employeeRoleSchema = Schema({
  name: {
    type: String,
    required: true,
  },
});

const EmployeeRoleModel = mongoose.model("EmployeeRole", employeeRoleSchema);

export default EmployeeRoleModel;
