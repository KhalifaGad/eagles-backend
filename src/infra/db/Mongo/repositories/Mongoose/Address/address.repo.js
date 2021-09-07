import BaseRepo from "../baseRepo";
import AddressModel from "./address.model";

class AddressRepo extends BaseRepo {
  constructor() {
    super(AddressModel);
  }
}

export default new AddressRepo();
