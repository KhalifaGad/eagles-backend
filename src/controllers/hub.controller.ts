import DefaultController from "./default.controller";
import { hubService } from "../services";
import { HubInterface } from "../types";

class HubController extends DefaultController<HubInterface> {
  constructor() {
    super(hubService);
  }
}

export default new HubController();
