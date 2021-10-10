class ClientEntity {
  _id;
  firstName;
  lastName;
  mobile;
  byBranchId;
  addresses = [];
  constructor({ _id, firstName, lastName, mobile, byBranchId, addresses }) {
    this._id = _id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.mobile = mobile;
    this.byBranchId = byBranchId;
    this.addresses = addresses;
  }
}

export default ClientEntity;
