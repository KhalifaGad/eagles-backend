import { merchantRepository } from "../mongoDB/repositories";
import DefaultService from "./default.service";
import { MerchantInterface } from "../types";

class MerchantService extends DefaultService<MerchantInterface> {
  constructor() {
    super(merchantRepository);
  }
}

export default new MerchantService();
