class CompanyEntity {
  _id;
  name;
  businessType;
  address;
  telephone;
  managers;
  ownerName;
  ownerMobile;
  byBranchId;
  constructor({
    _id,
    name,
    businessType,
    address,
    telephone,
    managers,
    ownerName,
    ownerMobile,
    byBranchId,
  }) {
    this._id = _id;
    this.name = name;
    this.businessType = businessType;
    this.address = address;
    this.telephone = telephone;
    this.managers = managers;
    this.ownerName = ownerName;
    this.ownerMobile = ownerMobile;
    this.byBranchId = byBranchId;
  }
}

export default CompanyEntity;
