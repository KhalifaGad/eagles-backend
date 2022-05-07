import DefaultRepository from "./default.repository";
import { MerchantModel } from "../models";
import { MerchantInterface } from "../../types";

class MerchantRepository extends DefaultRepository<MerchantInterface> {
  constructor() {
    super(MerchantModel);
  }
}

export default new MerchantRepository();
