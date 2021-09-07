class AddressEntity {
  _id;
  cityId;
  area;
  street;
  block;
  floorNumber;
  apartmentNumber;
  Landmark;
  Lat;
  Lng;
  occupantId;
  occupantType;
}

export const OCCUPANT_TYPES = [
  "Employee",
  "Branch",
  "Owner",
  "Client",
  "Company",
];

export default new AddressEntity();
