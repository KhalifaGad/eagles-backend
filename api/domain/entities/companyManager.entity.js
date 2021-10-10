class CompanyManager {
  _id;
  name;
  departmentName;
  mobile;
  companyId;
  constructor({ _id, name, departmentName, mobile, companyId }) {
    this._id = _id;
    this.name = name;
    this.departmentName = departmentName;
    this.mobile = mobile;
    this.companyId = companyId;
  }
}

export default CompanyManager;
