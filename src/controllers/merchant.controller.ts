import DefaultController from "./default.controller";
import { merchantService } from "../services";
import { MerchantInterface } from "../types";

class MerchantController extends DefaultController<MerchantInterface> {
  constructor() {
    super(merchantService);
  }
}

export default new MerchantController();
