import DefaultRepository from "./default.repository";
import { MerchantModel } from "../models";
import { MerchantInterface } from "../../types";

class MerchantRepository extends DefaultRepository<MerchantInterface> {
  constructor() {
    super(MerchantModel, [{ path: "company", populate: { path: "address.city" } }, { path: "address.city" }]);
  }
}

export default new MerchantRepository();
