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
  constructor({
    _id,
    cityId,
    area,
    street,
    block,
    floorNumber,
    apartmentNumber,
    landmark,
    lat = 0,
    lng = 0,
    occupantId,
    occupantType,
  }) {
    this._id = _id;
    this.occupantId = occupantId;
    this.cityId = cityId;
    this.area = area;
    this.street = street;
    this.block = block;
    this.floorNumber = floorNumber;
    this.apartmentNumber = apartmentNumber;
    this.landmark = landmark;
    this.lat = lat;
    this.lng = lng;
    this.occupantType = occupantType;
  }
}

export const OCCUPANT_TYPES = {
  employee: "Employee",
  branch: "Branch",
  owner: "Owner",
  client: "Client",
  company: "Company",
};

export default AddressEntity;
