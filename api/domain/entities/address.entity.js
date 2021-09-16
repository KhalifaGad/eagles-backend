class AddressEntity {
  _id;
  cityId;
  area;
  street;
  block;
  floorNumber;
  apartmentNumber;
  landmark;
  lat;
  lng;
  occupantId;
  occupantType;
}

export const OCCUPANT_TYPES = {
  employee: "Employee",
  branch: "Branch",
  owner: "Owner",
  client: "Client",
  company: "Company",
};

export default AddressEntity;
