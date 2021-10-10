class EmployeeEntity {
  _id;
  name;
  mobile;
  password;
  idNumber;
  loginPermission;
  branchId;
  addressId;
  employeeRoleId;

  constructor({
    _id,
    name,
    mobile,
    password,
    idNumber,
    loginPermission,
    branchId,
    addressId,
    employeeRoleId,
  } = {}) {
    this._id = _id;
    this.name = name;
    this.mobile = mobile;
    this.password = password;
    this.idNumber = idNumber;
    this.loginPermission = loginPermission;
    this.branchId = branchId;
    this.addressId = addressId;
    this.employeeRoleId = employeeRoleId;
  }
}

export default EmployeeEntity;
