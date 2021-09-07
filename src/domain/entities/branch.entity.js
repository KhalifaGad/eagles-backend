class BranchEntity {
  _id;
  name;
  commercialNumber;
  taxCardNumber;
  address;
  ownerId;
  employees = [];
  telephone;
}

export default new BranchEntity();
