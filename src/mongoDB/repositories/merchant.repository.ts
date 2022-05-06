import Repository from "./baseRepository";
import { MerchantModel } from "../models";
import { MerchantInterface } from "../../types";

class MerchantRepository extends Repository<MerchantInterface> {
  constructor() {
    super(MerchantModel);
  }
}

export default new MerchantRepository();
